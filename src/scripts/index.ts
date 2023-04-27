const runScripts = async (strapi) => {
    const wheels = await strapi.db
        .query("api::wheel.wheel")
        .findMany({ populate: ["brand", "model"] });
    wheels
        .filter((item) => item.brand && item.model)
        .forEach((item) => {
            strapi.entityService.update("api::wheel.wheel", item.id, {
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
