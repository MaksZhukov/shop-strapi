import { sanitize } from "@strapi/utils";
import {
    InvalidFilesPaginationError,
    buildPagination,
    normalizeFilesQuery,
} from "./files-pagination";

const FILE_MODEL_UID = "plugin::upload.file";

export default (plugin) => {
    const contentApi = plugin.controllers["content-api"];
    const originalFind = contentApi.find.bind(contentApi);

    // Never let GET /api/upload/files load the whole table (648k+ rows).
    // page/pageSize requests get { data, meta: { pagination } } with a total,
    // the same shape as other Strapi list endpoints; start/limit keep the plain array.
    contentApi.find = async (ctx) => {
        let normalized;
        try {
            normalized = normalizeFilesQuery(ctx.query);
        } catch (error) {
            if (error instanceof InvalidFilesPaginationError) {
                return ctx.badRequest("Invalid pagination parameters");
            }
            throw error;
        }

        ctx.query = normalized.query;
        await originalFind(ctx);

        if (!normalized.page) {
            return;
        }

        // count with the same sanitized filters the list query used
        const { filters } = await sanitize.contentAPI.query(
            { filters: normalized.query.filters },
            strapi.getModel(FILE_MODEL_UID),
            { auth: ctx.state.auth }
        );
        const total = await strapi.entityService.count(FILE_MODEL_UID, {
            filters,
        });

        ctx.body = {
            data: ctx.body,
            meta: { pagination: buildPagination(normalized.page, total) },
        };
    };

    return plugin;
};
