async function up(knex) {
    await knex("cabins").where({ price: 0 }).update({
        sold: true,
    });
    await knex("tires").where({ price: 0 }).update({
        sold: true,
    });
    await knex("wheels").where({ price: 0 }).update({
        sold: true,
    });
    await knex("spare_parts").where({ price: 0 }).update({
        sold: true,
    });
}

module.exports = { up };
