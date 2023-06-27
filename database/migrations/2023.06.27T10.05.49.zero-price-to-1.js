/**
 * Migration `zero-price-to-1`
 */
console.log("hello");
module.exports = {
    up: async (knex) => {
        await knex("cabins").where({ price: 0 }).update({
            price: 1,
        });
        await knex("tires").where({ price: 0 }).update({
            price: 1,
        });
        await knex("wheels").where({ price: 0 }).update({
            price: 1,
        });
        await knex("spare_parts").where({ price: 0 }).update({
            price: 1,
        });
    },
};
