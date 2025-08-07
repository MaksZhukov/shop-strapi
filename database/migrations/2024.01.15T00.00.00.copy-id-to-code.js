/**
 * Migration `copy-id-to-code`
 * Copies id field to code field for all entities that have a code field
 */

module.exports = {
    up: async (knex) => {
        // List of tables that have code fields based on the schema analysis
        const tablesWithCode = [
            "cars",
            "cabins",
            "spare_parts",
            "cars_on_parts",
            "generations",
            "models",
            "brands",
            "tires",
            "wheels",
            "kind_spare_parts",
            "engine_volumes",
            "tire_widths",
            "tire_heights",
            "tire_diameters",
            "tire_brands",
            "wheel_widths",
            "wheel_diameters",
            "wheel_disk_offsets",
            "wheel_number_holes",
            "wheel_diameter_center_holes",
        ];

        let totalUpdated = 0;

        for (const table of tablesWithCode) {
            try {
                // Check if table exists
                const tableExists = await knex.schema.hasTable(table);
                if (!tableExists) {
                    console.log(`Table ${table} does not exist, skipping...`);
                    continue;
                }

                // Check if code column exists
                const hasCodeColumn = await knex.schema.hasColumn(
                    table,
                    "code"
                );
                if (!hasCodeColumn) {
                    console.log(
                        `Table ${table} does not have code column, skipping...`
                    );
                    continue;
                }

                // Count records that need updating
                const countToUpdate = await knex(table)
                    .whereNull("code")
                    .orWhere("code", 0)
                    .count("* as count")
                    .first();

                const recordsToUpdate = countToUpdate.count;

                if (recordsToUpdate > 0) {
                    // Update code field with id value where code is null or 0
                    await knex(table)
                        .whereNull("code")
                        .orWhere("code", 0)
                        .update({
                            code: knex.raw("id"),
                        });

                    console.log(
                        `Updated ${table} table - copied id to code field for ${recordsToUpdate} records`
                    );
                    totalUpdated += parseInt(recordsToUpdate);
                } else {
                    console.log(
                        `Table ${table} - no records need updating (all have valid code values)`
                    );
                }
            } catch (error) {
                console.error(`Error updating ${table} table:`, error.message);
            }
        }

        console.log(
            `Migration completed. Total records updated: ${totalUpdated}`
        );
    },

    down: async (knex) => {
        // This migration is not reversible as we don't want to lose the code values
        console.log(
            "This migration is not reversible - code values would be lost"
        );
        throw new Error("This migration cannot be reversed");
    },
};
