export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/awaiting-cars");
        } catch (err) {
            console.error(err);
        }
    },
};
