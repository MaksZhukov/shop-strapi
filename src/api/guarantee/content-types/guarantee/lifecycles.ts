import axios from "axios";

export default {
    async afterUpdate() {
        try {
            await strapi
                .service("api::client.client")
                .revalidatePage("/guarantee");
        } catch (err) {
            console.error(err);
        }
    },
};
