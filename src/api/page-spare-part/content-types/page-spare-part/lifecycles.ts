export default {
    async afterUpdate() {
        try {
            await strapi.service("api::client.client").revalidatePage("/");
        } catch (err) {
            console.error(err);
        }
    },
};
