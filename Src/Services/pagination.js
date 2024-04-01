export function pagination(page, limit) {
    if (page <= 0 || !page) {
        page = 1
    }
    if (limit <= 0 || !limit) {
        limit = 10
    }
    const skip = (page -1) * limit
    return {limit, skip}
}