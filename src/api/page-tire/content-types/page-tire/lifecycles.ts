export default {
    async afterUpdate() {
        try {
            await strapi.service("api::client.client").revalidatePage("/tires");
        } catch (err) {
            console.error(err);
        }
    },
};
