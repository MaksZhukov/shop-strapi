import slugify from "slugify";
import utils from "@strapi/utils";
import scheduleGenerateSitemap from "../services/sitemap/sitemap";
const { ApplicationError } = utils.errors;

export const afterDeleteProduct = async (event) => {
    const { id, type } = event.result;
    const [{ results: resultFavorites }, { results: resultCarts }] =
        await Promise.all([
            strapi.service<any>("api::favorite.favorite").find({
                filters: {
                    product: [
                        {
                            __component: `product.${
                                type === "sparePart" ? "spare-part" : type
                            }`,
                            product: id,
                        },
                    ],
                },
            }),
            strapi.service<any>("api::shopping-cart.shopping-cart").find({
                filters: {
                    product: [
                        {
                            __component: `product.${
                                type === "sparePart" ? "spare-part" : type
                            }`,
                            product: id,
                        },
                    ],
                },
            }),
        ]);

    await Promise.all([
        strapi.db.query("api::favorite.favorite").delete({
            where: { id: resultFavorites.map((item) => item.id) },
        }),
        strapi.db.query("api::shopping-cart.shopping-cart").delete({
            where: { sparePart: resultCarts.map((item) => item.id) },
        }),
    ]);
};

export const beforeCreateProduct = (event) => {
    const { data } = event.params;
    if (data.id && data.name) {
        data.slug = slugify(data.name, { lower: true }) + "-" + data.id;
        data.h1 = data.name;
    }
    if (!data.brand) {
        throw new ApplicationError("Brand is required");
    }
};

export const beforeCreateOrUpdateCar = (event) => {
    const { data } = event.params;
    if (data.id) {
        let name =
            data.brand ??
            "" + " " + data.model ??
            "" + " " + data.manufactureDate
                ? `${new Date(data.manufactureDate).getFullYear()}`
                : "";
        data.slug = slugify(name, { lower: true }) + "-" + data.id;
    }
};

export const lifecycleSitemap = () => {
    scheduleGenerateSitemap();
};
