import slugify from "slugify";
import { getProductH1 } from "../services";
import scheduleGenerateSitemap from "../services/sitemap/sitemap";

export const afterDeleteProduct = async (event) => {
    const { id, type } = event.result;
    const [{ results: resultFavorites }, { results: resultCarts }] =
        await Promise.all([
            strapi.service("api::favorite.favorite").find({
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
            strapi.service("api::shopping-cart.shopping-cart").find({
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

export const beforeCreateProduct = async (event) => {
    const { data } = event.params;
    if (!data.brand) {
        throw new Error("Brand is required");
    }
    const slugId = data.code || data.id;
    if (data.id && !data.code) {
        data.code = data.id;
    }
    //TODO id is deprecated, use code instead
    if (slugId && data.name) {
        data.slug =
            slugify(data.name, { lower: true, strict: true }) + "-" + slugId;
        data.h1 = await getProductH1(data, event.model.singularName === "tire");
    }
    if (data.createdDate) {
        data.createdAt = data.createdDate;
    }
};

export const beforeCreateOrUpdateCar = (event) => {
    const { data } = event.params;
    if (data.id && !data.code) {
        data.code = data.id;
    }
    //TODO id is deprecated, use code instead
    const slugId = data.code || data.id;
    if (slugId) {
        let name =
            (data.brand ?? "") +
            " " +
            (data.model ?? "") +
            " " +
            (data.manufactureDate
                ? `${new Date(data.manufactureDate).getFullYear()}`
                : "");
        data.slug = slugify(name, { lower: true, strict: true }) + "-" + slugId;
    }
};

export const lifecycleSitemap = () => {
    scheduleGenerateSitemap();
};
