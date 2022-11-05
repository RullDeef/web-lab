export class AuthService {
    axios;
    access_token;
    user;
    constructor(axios) {
        this.axios = axios;
    }
    async auth(login, password) {
        const result = await this.axios.post('/auth/login', {
            login,
            password,
        });
        this.access_token = result.data.access_token;
        this.axios.defaults.headers.common.Authorization = `Bearer ${this.access_token}`;
        this.user = result.data.user;
    }
    logout() {
        this.axios.defaults.headers.common.Authorization = undefined;
        this.access_token = undefined;
        this.user = undefined;
    }
    isAuthorized() {
        return this.access_token !== undefined;
    }
    getUser() {
        if (this.user == null) {
            console.error('unautorised');
            throw new Error();
        }
        return { ...this.user };
    }
}
//# sourceMappingURL=auth.service.js.map