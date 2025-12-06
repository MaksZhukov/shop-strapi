export default {
    async beforeCreate(event) {
        const { data } = event.params;
        const userId = data.user;

        if (!userId) {
            throw new Error("User is required");
        }

        const currentFavoritesCount = await strapi.db
            .query("api::favorite.favorite")
            .count({
                where: {
                    user: userId,
                },
            });

        const MAX_FAVORITES_ITEMS = 30;
        if (currentFavoritesCount >= MAX_FAVORITES_ITEMS) {
            throw new Error(
                `Favorites limit reached. Maximum ${MAX_FAVORITES_ITEMS} items allowed.`
            );
        }
    },
};
