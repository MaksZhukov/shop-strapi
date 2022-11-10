export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/buying-car");
        } catch (err) {
            console.error(err);
        }
    },
};
