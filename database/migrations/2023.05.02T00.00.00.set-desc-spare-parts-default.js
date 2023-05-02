async function up(knex) {
    console.log("hello");
    await knex("spare_parts").where({ description: null }).update({
        description:
            "Оригинальная запчасть, которая прошла тщательную проверку перед продажей. Она подходит для данной модели авто. Товар находится в хорошем состоянии и готов к установке. В хорошем состоянии. Из Европы. Доставка",
    });
}

module.exports = { up };
