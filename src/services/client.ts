import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
});

export const revalidateClientPage = async (path: string) => {
    try {
        const clientLocalUrls = strapi.config.get("server.clientLocalUrls");
        const revalidateToken = strapi.config.get("server.revalidateToken");
        await Promise.all(
            clientLocalUrls.map((clientLocalUrl) =>
                axios.get(
                    clientLocalUrl +
                        `/api/revalidate?revalidateToken=${revalidateToken}&pagePath=${path}`,
                    { timeout: 30000 }
                )
            )
        );

        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: `Strapi BE Successfully Revalidate ${path}`,
        });
    } catch (err) {
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: `Strapi BE Error Revalidation ${path}`,
            text: err.toString(),
        });
    }
};
