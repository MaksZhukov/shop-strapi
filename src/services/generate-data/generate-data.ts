import { faker } from "@faker-js/faker";
import axios from "axios";
import FormData from "form-data";

export let flushProducts = async (strapi) => {
    await strapi.entityService.deleteMany("api::product.product");
    strapi.log.info("PRODUCTS FLUSHED");
};

export let flushUploads = async (strapi) => {
    let uploads = await strapi.plugins.upload.services.upload.findMany();
    await Promise.all(
        uploads.map((file) =>
            strapi.plugins.upload.services.upload.remove(file)
        )
    );
    strapi.log.info("UPLOADS FLUSHED");
};

let countProductsByChank = 5;

export let generateProducts = async (strapi, count = 50) => {
    if (count < 0) {
        strapi.log.info("GENERATE PRODUCTS FINISHED");
        return;
    }

    try {
        let promisesProducts = [];
        let items = [];
        for (let i = 0; i < countProductsByChank; i++) {
            let data = {
                id: faker.unique(faker.datatype.number),
                name: faker.random.words(10),
                description: faker.random.words(100),
                price: faker.datatype.number({ min: 20, max: 1000 }),
            };
            items.push(data);
            promisesProducts.push(
                strapi.entityService.create("api::product.product", {
                    data,
                })
            );
        }
        await Promise.all([...promisesProducts]);

        const imageUrls = new Array(countProductsByChank)
            .fill(null)
            .map(() =>
                new Array(faker.datatype.number({ min: 3, max: 6 }))
                    .fill(null)
                    .map(() => faker.image.image())
            );

        let imagesResponse = await Promise.all(
            imageUrls.map((urls) =>
                Promise.all(
                    urls.map((url) =>
                        axios(url, { responseType: "arraybuffer" })
                    )
                )
            )
        );

        await Promise.all(
            new Array(countProductsByChank).fill(null).map((el, index) => {
                let formData = new FormData();

                for (let i = 0; i < imagesResponse[index].length; i++) {
                    let imageName = imagesResponse[index][i].request.path
                        .split("/")
                        .pop();
                    formData.append(
                        "files",
                        imagesResponse[index][i].data,
                        imageName
                    );
                }
                formData.append("ref", "api::product.product");
                formData.append("refId", items[index].id.toString());
                formData.append("field", "images");
                return axios.post(
                    "http://localhost:1337/api/upload",
                    formData,
                    { timeout: 600000 }
                );
            })
        );
        generateProducts(strapi, count - countProductsByChank);
    } catch (err) {
        strapi.log.error("Error", err);
    }
};
