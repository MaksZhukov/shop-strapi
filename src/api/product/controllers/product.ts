/**
 *  product controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::product.product",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::product.product")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: ["images", "sparePart", "model", "brand"],
                });
            if (entity) {
                entity.priceUSD =
                    entity.price *
                    (
                        strapi.service(
                            "api::currency-freaks.currency-freaks"
                        ) as any
                    ).getCoefficient();
                const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
                return this.transformResponse(sanitizedEntity);
            }
        },
        async find(ctx) {
            const response = await super.find(ctx);
            response.data = await Promise.all(
                response.data.map(async (item) => ({
                    ...item,
                    attributes: {
                        ...item.attributes,
                        priceUSD:
                            item.attributes.price *
                            (
                                strapi.service(
                                    "api::currency-freaks.currency-freaks"
                                ) as any
                            ).getCoefficient(),
                    },
                }))
            );
            return response;
        },
    })
);
