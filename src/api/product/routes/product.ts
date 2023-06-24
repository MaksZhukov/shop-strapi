export default {
    routes: [
        {
            method: "GET",
            path: "/products",
            handler: "product.find",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
