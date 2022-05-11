/**
 * shopping-cart router.
 */

// @ts-ignore
export default {
    routes: [
        {
            method: "GET",
            path: "/shopping-cart",
            handler: 'shopping-cart.find'
        }
    ]
}