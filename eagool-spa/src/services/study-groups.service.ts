import { StudyGroup } from './../models/study-group';
import { Axios } from 'axios';

export class StudyGroupsService {
  private readonly pageSize: number = 10;

  constructor(private readonly axios: Axios) {}

  async getAll(): Promise<StudyGroup[]> {
    const result = await this.axios.get<StudyGroup[]>('/study-groups');
    return result.data;
  }

  async getAllPaged(page: number) {
    const skip = page * this.pageSize;
    const limit = this.pageSize;
    const result = await this.axios.get<StudyGroup[]>(
      `/study-groups?skip=${skip}&limit=${limit}`,
    );
    return result.data;
  }

  async deleteGroup(id: number) {
    await this.axios.delete(`/study-groups/${id}`);
  }
}
