export const updateH1ForAllProducts = async (strapi) => {
    const spareParts = await strapi.db
        .query("api::spare-part.spare-part")
        .findMany();
    spareParts.forEach((data) => {
        strapi.db.query("api::spare-part.spare-part").update({
            where: { id: data.id },
            data: {
                h1: data.name,
            },
        });
    });

    const wheels = await strapi.db.query("api::wheel.wheel").findMany();
    wheels.forEach((data) => {
        strapi.db.query("api::wheel.wheel").update({
            where: { id: data.id },
            data: {
                h1: data.name,
            },
        });
    });

    const tires = await strapi.db.query("api::tire.tire").findMany();
    tires.forEach((data) => {
        strapi.db.query("api::tire.tire").update({
            where: { id: data.id },
            data: {
                h1: data.name,
            },
        });
    });
};
