const runScripts = async (strapi) => {
    const spareParts = await strapi.db
        .query("api::spare-part.spare-part")
        .findMany({ populate: ["brand", "model"] });
    spareParts
        .filter((item) => item.brand && item.model)
        .forEach((item) => {
            strapi.entityService.update("api::spare-part.spare-part", item.id, {
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
