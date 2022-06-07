/**
 * shopping-cart router.
 */

// @ts-ignore
export default {
    routes: [
        {
            method: "GET",
            path: "/shopping-cart",
            handler: "shopping-cart.find",
        },
        {
            method: "POST",
            path: "/shopping-cart",
            handler: "shopping-cart.create",
        },
        {
            method: "DELETE",
            path: "/shopping-cart",
            handler: "shopping-cart.delete",
        },
    ],
};
