export interface UserProgressService {
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createUserProgressDto: any): Promise<any>;
    update(id: string, updateUserProgressDto: any): Promise<any>;
    delete(id: string): Promise<any>;
}