"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    getWelcomeMessage() {
        console.log(strapi);
        return "Welcome to Strapi 🚀";
    },
});
