import axios from "axios";

export default ({ strapi }) => ({
    async revalidatePage(pagePath) {
        let clientUrl = strapi.config.get("api.clientUrl");
        let revalidateToken = strapi.config.get("api.revalidateToken");
        return await axios.get(
            clientUrl +
                `/api/revalidate?revalidateToken=${revalidateToken}&pagePath=${pagePath}`
        );
    },
});
