"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  product controller
 */
const https_1 = require("https");
const strapi_1 = require("@strapi/strapi");
const axios_1 = __importDefault(require("axios"));
let coefficient = 0;
const fetchCoefficient = async () => {
    try {
        const { data: { rates: { BYN }, }, } = await axios_1.default.get("https://api.currencyfreaks.com/latest?apikey=77c86f7878774b21b8edf00dbc45d550&symbols=BYN", { httpsAgent: new https_1.Agent({ rejectUnauthorized: false }) });
        coefficient = 1 / BYN;
    }
    catch (err) {
        console.log(err);
    }
};
fetchCoefficient();
setInterval(() => {
    fetchCoefficient();
}, 60 * 60 * 1000);
exports.default = strapi_1.factories.createCoreController("api::product.product", ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db
            .query("api::product.product")
            .findOne({
            where: { $or: [{ slug: id }, { id }] },
            populate: {
                images: true,
                sparePart: true,
                model: true,
                brand: true,
            },
        });
        entity.priceUSD = entity.price * coefficient;
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    },
    async find(ctx) {
        const response = await super.find(ctx);
        response.data = await Promise.all(response.data.map(async (item) => ({
            ...item,
            attributes: {
                ...item.attributes,
                priceUSD: item.attributes.price * coefficient,
            },
        })));
        return response;
    },
}));
