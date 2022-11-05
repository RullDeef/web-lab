export declare enum UserRole {
    admin = "admin",
    tutor = "tutor",
    student = "student"
}
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    role: UserRole;
    login?: string;
}
export declare function mixedName(user: User): string;
export declare function translateUserRole(role: UserRole): string;
