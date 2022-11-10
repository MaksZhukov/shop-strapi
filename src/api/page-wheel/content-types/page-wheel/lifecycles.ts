export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/wheels");
        } catch (err) {
            console.error(err);
        }
    },
};
