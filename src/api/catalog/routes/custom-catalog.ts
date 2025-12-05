/**
 * custom catalog router.
 */

export default {
    routes: [
        {
            method: "GET",
            path: "/catalog/top-categories",
            handler: "api::catalog.catalog.findTopCategories",
        },
    ],
};
