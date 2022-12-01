export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/car-dismantling-photos");
        } catch (err) {
            console.error(err);
        }
    },
};
