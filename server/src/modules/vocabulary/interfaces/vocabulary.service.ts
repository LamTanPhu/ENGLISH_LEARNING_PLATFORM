export interface VocabularyService {
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createVocabularyDto: any): Promise<any>;
    update(id: string, updateVocabularyDto: any): Promise<any>;
    delete(id: string): Promise<any>;
}