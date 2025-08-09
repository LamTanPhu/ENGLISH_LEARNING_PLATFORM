export const getPagination = (page: number = 1, limit: number = 10) => ({
    skip: (page - 1) * limit,
    limit,
});