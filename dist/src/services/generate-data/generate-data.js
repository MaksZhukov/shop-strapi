"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProducts = exports.flushUploads = exports.flushProducts = void 0;
const faker_1 = require("@faker-js/faker");
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const form_data_1 = __importDefault(require("form-data"));
const client = axios_1.default.create({
    timeout: 600000,
    maxContentLength: 500 * 1000 * 1000,
    httpsAgent: new https_1.default.Agent({ keepAlive: true })
});
let flushProducts = async (strapi) => {
    await strapi.entityService.deleteMany("api::product.product");
    strapi.log.info("PRODUCTS FLUSHED");
};
exports.flushProducts = flushProducts;
let flushUploads = async (strapi) => {
    let uploads = await strapi.plugins.upload.services.upload.findMany();
    await Promise.all(uploads.map((file) => strapi.plugins.upload.services.upload.remove(file)));
    strapi.log.info("UPLOADS FLUSHED");
};
exports.flushUploads = flushUploads;
let countProductsByChank = 100;
let generateProducts = async (strapi, count = 100) => {
    if (count <= 0) {
        strapi.log.info("GENERATE PRODUCTS FINISHED");
        return;
    }
    try {
        let promisesProducts = [];
        let items = [];
        for (let i = 0; i < countProductsByChank; i++) {
            let data = {
                id: faker_1.faker.unique(faker_1.faker.datatype.number),
                name: faker_1.faker.random.words(10),
                description: faker_1.faker.random.words(100),
                price: faker_1.faker.datatype.number({ min: 20, max: 1000 }),
                publishedAt: new Date()
            };
            items.push(data);
            promisesProducts.push(strapi.entityService.create("api::product.product", {
                data,
            }));
        }
        await Promise.all([...promisesProducts]);
        const imageUrls = new Array(countProductsByChank)
            .fill(null)
            .map(() => new Array(faker_1.faker.datatype.number({ min: 3, max: 6 }))
            .fill(null)
            .map(() => faker_1.faker.image.image()));
        let imagesResponse = await Promise.all(imageUrls.map((urls) => Promise.all(urls.map((url) => client(url, { responseType: "arraybuffer" })))));
        await Promise.all(new Array(countProductsByChank).fill(null).map((el, index) => {
            let formData = new form_data_1.default();
            for (let i = 0; i < imagesResponse[index].length; i++) {
                let imageName = imagesResponse[index][i].request.path
                    .split("/")
                    .pop();
                formData.append("files", imagesResponse[index][i].data, imageName);
            }
            formData.append("ref", "api::product.product");
            formData.append("refId", items[index].id.toString());
            formData.append("field", "images");
            return client.post("http://localhost:1337/api/upload", formData);
        }));
        (0, exports.generateProducts)(strapi, count - countProductsByChank);
    }
    catch (err) {
        console.log(err);
        strapi.log.error("Error", err);
    }
};
exports.generateProducts = generateProducts;
