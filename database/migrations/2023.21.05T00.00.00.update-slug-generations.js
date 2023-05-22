const slugify = require("slugify");

async function up(knex) {
    const generations = await knex("generations").select();
    const queries = [];
    generations.forEach(async (item) => {
        queries.push(
            knex("generations")
                .where({ id: item.id })
                .update({
                    slug: slugify(item.name, { lower: true, strict: true }),
                })
        );
    });
    await Promise.all(queries);
}

module.exports = { up };
