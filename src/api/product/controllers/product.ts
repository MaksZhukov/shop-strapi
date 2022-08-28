/**
 *  product controller
 */
import { Agent } from "https";
import { factories } from "@strapi/strapi";
import axios from "axios";

let coefficient = 0;

const fetchCoefficient = async () => {
    try {
        const {
            data: {
                rates: { BYN },
            },
        } = await axios.get(
            "https://api.currencyfreaks.com/latest?apikey=77c86f7878774b21b8edf00dbc45d550&symbols=BYN",
            { httpsAgent: new Agent({ rejectUnauthorized: false }) }
        );
        coefficient = 1 / BYN;
    } catch (err) {
        console.log(err);
    }
};

fetchCoefficient();

setInterval(() => {
    fetchCoefficient();
}, 60 * 60 * 1000);

export default factories.createCoreController(
    "api::product.product",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::product.product")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: {
                        images: true,
                        sparePart: true,
                        model: true,
                        brand: true,
                    },
                });
            if (entity) {
                entity.priceUSD = entity.price * coefficient;
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
                        priceUSD: item.attributes.price * coefficient,
                    },
                }))
            );
            return response;
        },
    })
);
