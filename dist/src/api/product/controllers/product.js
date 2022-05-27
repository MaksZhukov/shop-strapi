"use strict";
/**
 *  product controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::product.product", 
//@ts-ignore
({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;
        //@ts-ignore
        const entity = await strapi.db.query("api::product.product").findOne({
            where: { $or: [{ slug: id }, { id }] },
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));
