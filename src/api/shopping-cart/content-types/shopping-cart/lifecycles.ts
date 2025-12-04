export default {
    async beforeCreate(event) {
        const { data } = event.params;
        const userId = data.user;

        if (!userId) {
            throw new Error("User is required");
        }

        const currentCartCount = await strapi.db
            .query("api::shopping-cart.shopping-cart")
            .count({
                where: {
                    user: userId,
                },
            });

        const MAX_CART_ITEMS = 30;
        if (currentCartCount >= MAX_CART_ITEMS) {
            throw new Error(
                `Shopping cart limit reached. Maximum ${MAX_CART_ITEMS} items allowed.`
            );
        }
    },
};
