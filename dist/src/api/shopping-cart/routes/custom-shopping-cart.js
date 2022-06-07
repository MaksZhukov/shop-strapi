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
