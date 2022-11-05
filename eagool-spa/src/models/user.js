export var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["tutor"] = "tutor";
    UserRole["student"] = "student";
})(UserRole || (UserRole = {}));
export function mixedName(user) {
    return `${user.last_name} ${user.first_name[0]}.`;
}
export function translateUserRole(role) {
    switch (role) {
        case UserRole.admin:
            return 'Администратор';
        case UserRole.tutor:
            return 'Преподаватель';
        case UserRole.student:
            return 'Студент';
    }
}
//# sourceMappingURL=user.js.map