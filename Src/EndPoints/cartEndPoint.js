import roles from "../Middleware/roles.js"

export const endPoints = {
    create: [roles.User],
    remove: [roles.User],
    clear: [roles.User],
    get: [roles.User, roles.Admin]
}