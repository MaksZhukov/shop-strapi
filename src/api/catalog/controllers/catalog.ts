/**
 * catalog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::catalog.catalog",
    ({ strapi }) => ({
        async findTopCategories(ctx, next) {
            try {
                const catalog = await strapi.db
                    .query("api::catalog.catalog")
                    .findOne({
                        populate: {
                            categories: {
                                populate: {
                                    kindSpareParts: {
                                        fields: [
                                            "id",
                                            "name",
                                            "slug",
                                            "code",
                                            "type",
                                        ],
                                    },
                                },
                            },
                        },
                    });

                // Process each category
                const topCategories = await Promise.all(
                    catalog.categories.map(async (category: any) => {
                        // For each kind spare part, count unsold spare parts
                        const kindSparePartsWithCounts = await Promise.all(
                            category.kindSpareParts.map(
                                async (kindSparePart: any) => {
                                    const unsoldCount =
                                        await strapi.entityService.count(
                                            "api::spare-part.spare-part",
                                            {
                                                filters: {
                                                    kindSparePart: {
                                                        id: kindSparePart.id,
                                                    },
                                                    sold: {
                                                        $eq: false,
                                                    },
                                                },
                                            }
                                        );

                                    return {
                                        kindSparePart,
                                        count: unsoldCount,
                                    };
                                }
                            )
                        );

                        // Sort by count (descending) and take top 10
                        const top10 = kindSparePartsWithCounts
                            .filter((item) => item.count > 0)
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 10)
                            .map((item) => ({
                                id: item.kindSparePart.id,
                                name: item.kindSparePart.name,
                                slug: item.kindSparePart.slug,
                                code: item.kindSparePart.code,
                                type: item.kindSparePart.type,
                                spareParts: {
                                    count: item.count,
                                },
                            }));

                        // Calculate total spare parts count for the category
                        const totalSparePartsCount = top10.reduce(
                            (sum, item) => sum + item.spareParts.count,
                            0
                        );

                        return {
                            name: category.name,
                            kindSpareParts: top10,
                            totalSparePartsCount,
                        };
                    })
                );

                return ctx.send({ data: topCategories }, 200);
            } catch (error) {
                ctx.throw(500, error);
            }
        },
    })
);
