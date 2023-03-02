async function up(knex) {
    await knex("cabins").update({
        sold: false,
    });
    await knex("tires").update({
        sold: false,
    });
    await knex("wheels").update({
        sold: false,
    });
    await knex("spare_parts").update({
        sold: false,
    });
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
