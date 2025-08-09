export interface CommentsService {
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createCommentDto: any): Promise<any>;
    update(id: string, updateCommentDto: any): Promise<any>;
    delete(id: string): Promise<any>;
}