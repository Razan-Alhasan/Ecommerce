const roles = {
    Admin: "Admin",
    User: "User"
};
export const endPoints = {
    create: [roles.Admin],
    update: [roles.Admin],
    getAll: [roles.Admin],
    getById: [roles.Admin, roles.User],
    getActive: [roles.User],
}