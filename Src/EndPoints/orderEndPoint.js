import roles from "../Middleware/roles.js"

export const endPoints = {
    create: [roles.User],
    getAll: [roles.User],
    cancelOrder: [roles.User],
    changeOrderStatus: [roles.Admin]
}