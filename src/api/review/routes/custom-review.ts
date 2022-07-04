/**
 * shopping-cart router.
 */

// @ts-ignore
export default {
    routes: [
        {
            method: "GET",
            path: "/reviews/check",
            handler: "api::review.review.checkStatus",
        },
    ],
};
