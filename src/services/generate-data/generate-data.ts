import { faker } from '@faker-js/faker';


let generateProducts = async (strapi, count = 10) => {
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
                status: 'published'
            })
        );
    }
    await Promise.all(promises);
}

export { generateProducts }


