// Strapi v4's GET /api/upload/files ignores page/pageSize and pagination[...]
// (it calls findMany, not findPage), so without start/limit it loads every
// file. This maps all pagination shapes onto start/limit and caps the limit.

export const DEFAULT_FILES_LIMIT = 100;
export const MAX_FILES_LIMIT = 1000;

const PAGINATION_KEYS = ["page", "pageSize", "start", "limit"];

const toInt = (value: unknown): number | null => {
    if (value === undefined || value === null || value === "") {
        return null;
    }
    const number = Number(value);
    if (!Number.isInteger(number)) {
        return NaN;
    }
    return number;
};

export class InvalidFilesPaginationError extends Error {}

export const normalizeFilesQuery = (query: Record<string, any> = {}) => {
    const { pagination, ...rest } = query;
    const source = { ...(pagination ?? {}), ...rest };

    const page = toInt(source.page);
    const pageSize = toInt(source.pageSize);
    const start = toInt(source.start);
    const limit = toInt(source.limit);

    for (const value of [page, pageSize, start, limit]) {
        if (Number.isNaN(value)) {
            throw new InvalidFilesPaginationError(
                "Pagination values must be integers"
            );
        }
    }
    if ((page !== null || pageSize !== null) && (start !== null || limit !== null)) {
        throw new InvalidFilesPaginationError(
            "Use either page/pageSize or start/limit, not both"
        );
    }
    if ((page !== null && page < 1) || (start !== null && start < 0)) {
        throw new InvalidFilesPaginationError(
            "page must be >= 1 and start must be >= 0"
        );
    }

    let resolvedStart = start ?? 0;
    // limit=-1 means "no limit" in Strapi, so anything below 1 falls back to the default
    let resolvedLimit = limit ?? pageSize ?? DEFAULT_FILES_LIMIT;
    if (resolvedLimit < 1) {
        resolvedLimit = DEFAULT_FILES_LIMIT;
    }
    resolvedLimit = Math.min(resolvedLimit, MAX_FILES_LIMIT);
    if (page !== null) {
        resolvedStart = (page - 1) * resolvedLimit;
    }

    const normalized = { ...rest };
    for (const key of PAGINATION_KEYS) {
        delete normalized[key];
    }

    return {
        query: { ...normalized, start: resolvedStart, limit: resolvedLimit },
        // set only for page/pageSize requests, which get { data, meta.pagination } back
        page:
            page !== null || pageSize !== null
                ? { page: page ?? 1, pageSize: resolvedLimit }
                : null,
    };
};

export const buildPagination = (
    { page, pageSize }: { page: number; pageSize: number },
    total: number
) => ({
    page,
    pageSize,
    pageCount: Math.ceil(total / pageSize),
    total,
});
