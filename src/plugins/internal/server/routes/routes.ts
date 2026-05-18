export default {
    type: "admin",
    routes: [
        {
            method: "GET",
            path: "/downloadCatalogJson",
            handler: "controller.downloadCatalogJson",
            config: {
                policies: ["admin::isAuthenticatedAdmin"],
            },
        },
    ],
};
