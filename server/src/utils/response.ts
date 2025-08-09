export const success = (data: any, message = 'Success') => ({ success: true, data, message });
export const paginated = (data: any, page: number, limit: number, total: number) => ({
    success: true,
    data,
    pagination: { page, limit, total },
});