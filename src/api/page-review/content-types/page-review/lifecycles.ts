export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/reviews");
        } catch (err) {
            console.error(err);
        }
    },
};
