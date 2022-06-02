"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProducts = exports.flushProducts = void 0;
const faker_1 = require("@faker-js/faker");
let flushProducts = async (strapi) => {
    return await strapi.entityService.deleteMany("api::product.product");
};
exports.flushProducts = flushProducts;
let generateProducts = async (strapi, count = 1000) => {
    let promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(strapi.entityService.create("api::product.product", {
            data: {
                id: faker_1.faker.unique(faker_1.faker.datatype.number),
                name: faker_1.faker.commerce.product(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.datatype.number(),
            },
<<<<<<< HEAD
            status: 'live'
=======
>>>>>>> 8e2347540aa2252810e4f68f47e48d73f471b65e
        }));
    }
    await Promise.all(promises);
};
exports.generateProducts = generateProducts;
