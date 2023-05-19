const slugify = require("slugify");

async function up(knex) {
    const kindSpareParts = await knex("kind_spare_parts").select();
    const queries = [];
    kindSpareParts.forEach(async (item) => {
        queries.push(
            knex("kind_spare_parts")
                .where({ id: item.id })
                .update({ slug: slugify(item.name, { lower: true }) })
        );
    });
    await Promise.all(queries);
}

module.exports = { up };
