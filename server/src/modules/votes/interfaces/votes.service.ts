export interface VotesService {
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createVoteDto: any): Promise<any>;
    delete(id: string): Promise<any>;
}