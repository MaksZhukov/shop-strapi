/**
 * shopping-cart router.
 */

export default {
    routes: [
        {
            method: "GET",
            path: "/shopping-cart",
            handler: "api::shopping-cart.shopping-cart.find",
        },
        {
            method: "POST",
            path: "/shopping-cart",
            handler: "api::shopping-cart.shopping-cart.create",
        },
        {
            method: "DELETE",
            path: "/shopping-cart",
            handler: "api::shopping-cart.shopping-cart.deleteMany",
        },
        {
            method: "DELETE",
            path: "/shopping-cart/:id",
            handler: "api::shopping-cart.shopping-cart.delete",
        },
    ],
};
