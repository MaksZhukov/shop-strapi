import { faker } from "@faker-js/faker";

export let flushProducts = async (strapi) => {
  return await strapi.entityService.deleteMany("api::product.product");
};

export let generateProducts = async (strapi, count = 1000) => {
  let promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(
      strapi.entityService.create("api::product.product", {
        data: {
          id: faker.unique(faker.datatype.number),
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.datatype.number(),
        },
      })
    );
  }
  await Promise.all(promises);
};
