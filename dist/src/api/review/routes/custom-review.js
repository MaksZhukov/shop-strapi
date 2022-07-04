"use strict";
/**
 * shopping-cart router.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
exports.default = {
    routes: [
        {
            method: "GET",
            path: "/reviews/check",
            handler: "api::review.review.checkStatus",
        },
    ],
};
