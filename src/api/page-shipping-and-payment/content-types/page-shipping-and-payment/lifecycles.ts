export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/shipping-and-payment");
        } catch (err) {
            console.error(err);
        }
    },
};
