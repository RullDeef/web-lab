export class StudyGroupsService {
    axios;
    pageSize = 10;
    constructor(axios) {
        this.axios = axios;
    }
    async getAll() {
        const result = await this.axios.get('/study-groups');
        return result.data;
    }
    async getAllPaged(page) {
        const skip = page * this.pageSize;
        const limit = this.pageSize;
        const result = await this.axios.get(`/study-groups?skip=${skip}&limit=${limit}`);
        return result.data;
    }
    async deleteGroup(id) {
        await this.axios.delete(`/study-groups/${id}`);
    }
}
//# sourceMappingURL=study-groups.service.js.map