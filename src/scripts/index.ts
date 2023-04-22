const runScripts = async (strapi) => {
    const cabins = await strapi.db
        .query("api::cabin.cabin")
        .findMany({ populate: ["brand", "model"] });
    cabins
        .filter((item) => item.brand && item.model)
        .forEach((item) => {
            strapi.entityService.update("api::cabin.cabin", item.id, {
                data: {
                    h1:
                        item.name +
                        " " +
                        item.brand.name +
                        " " +
                        item.model.name,
                },
            });
        });
};

export default runScripts;
