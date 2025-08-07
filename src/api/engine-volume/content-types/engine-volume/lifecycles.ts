export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.id && !data.code) {
            data.code = data.id;
        }
    },
};
