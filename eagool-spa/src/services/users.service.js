export class UsersService {
    axios;
    pageSize = 10;
    constructor(axios) {
        this.axios = axios;
    }
    async getAll() {
        const result = await this.axios.get('/users');
        return result.data;
    }
    async getAllPaged(page) {
        const skip = page * this.pageSize;
        const limit = this.pageSize;
        const result = await this.axios.get(`/users?skip=${skip}&limit=${limit}`);
        return result.data;
    }
    async registerUser(dto) {
        const result = await this.axios.post('/users', dto);
        console.log(result);
    }
    async deleteUser(id) {
        const result = await this.axios.delete(`/users/${id}`);
        console.log(result);
    }
    async editUser(id, dto) {
        const result = await this.axios.put(`/users/${id}`, dto);
        console.log(result);
    }
}
//# sourceMappingURL=users.service.js.map