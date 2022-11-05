import { StudyGroup } from './../models/study-group';
import { Axios } from 'axios';
export declare class StudyGroupsService {
    private readonly axios;
    private readonly pageSize;
    constructor(axios: Axios);
    getAll(): Promise<StudyGroup[]>;
    getAllPaged(page: number): Promise<StudyGroup[]>;
    deleteGroup(id: number): Promise<void>;
}
