import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
});

export default ({ strapi }) => ({
    async revalidatePage(pagePath) {
        let clientLocalUrl = strapi.config.get("server.clientLocalUrl");
        let revalidateToken = strapi.config.get("server.revalidateToken");
        return await axios.get(
            clientLocalUrl +
                `/api/revalidate?revalidateToken=${revalidateToken}&pagePath=${pagePath}`,
            { timeout: 30000 }
        );
    },
});
