export enum UserRole {
    ADMIN = 'admin',
    TUTOR = 'tutor',
    STUDENT = 'student'
}

export class User {

    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public role?: UserRole,
        public login?: string,
    ) { }
}
