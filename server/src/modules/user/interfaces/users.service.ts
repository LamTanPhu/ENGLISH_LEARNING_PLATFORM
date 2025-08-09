export interface UsersService {
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createUserDto: any): Promise<any>;
    update(id: string, updateUserDto: any): Promise<any>;
    delete(id: string): Promise<any>;
}