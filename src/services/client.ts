import axios from "axios";
import axiosRetry from "axios-retry";
import shell from "shelljs";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
});

export const revalidateClientPage = async (path: string) => {
    try {
        let clientLocalUrl = strapi.config.get("server.clientLocalUrl");
        let revalidateToken = strapi.config.get("server.revalidateToken");
        await axios.get(
            clientLocalUrl +
                `/api/revalidate?revalidateToken=${revalidateToken}&pagePath=${path}`,
            { timeout: 30000 }
        );
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: `Strapi BE Successfully Revalidate ${path}`,
        });
        shell.exec("sh clear-iis-arr-cache.sh");
    } catch (err) {
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: `Strapi BE Error Revalidation ${path}`,
            text: err.toString(),
        });
    }
};
