"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_data_1 = require("./services/generate-data/generate-data");
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register( /*{ strapi }*/) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        await Promise.all([(0, generate_data_1.flushProducts)(strapi), (0, generate_data_1.flushUploads)(strapi)]);
        (0, generate_data_1.generateProducts)(strapi);
    },
};
