import { faker } from "@faker-js/faker";
import axios from 'axios';
import FormData from "form-data";

export let flushProducts = async (strapi) => {
    return await strapi.entityService.deleteMany("api::product.product");
};

export let flushUploads = async (strapi) => {
    let uploads = await strapi.plugins.upload.services.upload.findMany();
    return await Promise.all(uploads.map(file => strapi.plugins.upload.services.upload.remove(file));
};

export let generateProducts = async (strapi, count = 50) => {
    try {
        let promisesProducts = [];
        let items = [];
        for (let i = 0; i < count; i++) {
            let data = {
                id: faker.unique(faker.datatype.number),
                name: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.datatype.number(),
            }
            items.push(data);
            promisesProducts.push(
                strapi.entityService.create("api::product.product", {
                    data
                })
            );
        }
        await Promise.all([...promisesProducts,]);

        const imageUrls = new Array(count).fill(null).map(() =>
            new Array(faker.datatype.number({ min: 3, max: 6 })).fill(null)
                .map(() => faker.image.image()));

        let imagesResponse = await Promise.all(imageUrls.map((urls) => Promise.all(urls.map((url) => axios(url, { responseType: 'arraybuffer' })))));

        await Promise.all(new Array(count).fill(null).map((el, index) => {
            let formData = new FormData();

            for (let i = 0; i < imagesResponse[index].length; i++) {
                let imageName = imagesResponse[index][i].request.path.split('/').pop();
                formData.append('files', imagesResponse[index][i].data, imageName);
            }
            formData.append('ref', 'api::product.product');
            formData.append('refId', items[index].id.toString());
            formData.append("field", "image");
            return axios.post('http://localhost:1337/api/upload', formData);
        }))
    } catch (err) {
        console.log('Error', err)
    }
};

