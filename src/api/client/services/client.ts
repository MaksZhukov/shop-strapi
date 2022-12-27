import axios from "axios";

export default ({ strapi }) => ({
    async revalidatePage(pagePath) {
        let clientUrl = strapi.config.get("server.clientUrl");
        let revalidateToken = strapi.config.get("server.revalidateToken");
        return await axios.get(
            clientUrl +
                `/api/revalidate?revalidateToken=${revalidateToken}&pagePath=${pagePath}`
        );
    },
});
