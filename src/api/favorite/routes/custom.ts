export default {
    routes: [
        {
            method: "DELETE",
            path: "/favorites",
            handler: "favorite.deleteAll",
        },
    ],
};
