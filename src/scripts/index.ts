import { sendNewProductsToEmail } from "../services";

const runScripts = async (strapi) => {
    sendNewProductsToEmail({ strapi });
};

export default runScripts;
