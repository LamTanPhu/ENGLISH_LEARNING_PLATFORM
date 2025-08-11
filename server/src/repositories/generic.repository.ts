import { Document, Model } from 'mongoose';

export interface GenericRepository<T extends Document> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    create(item: any): Promise<T>;
    update(id: string, item: any): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findOneByQuery(query: any): Promise<T | null>; // New method
    findByQuery(query: any): Promise<T[]>; // New method for list
}

    export class GenericRepository<T extends Document> implements GenericRepository<T> {
    private model: Model<T>; // Kept private

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findOne(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(item: any): Promise<T> {
        const newItem = new this.model(item);
        return newItem.save();
    }

    async update(id: string, item: any): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findOneByQuery(query: any): Promise<T | null> {
        return this.model.findOne(query).exec();
    }

    async findByQuery(query: any): Promise<T[]> {
        return this.model.find(query).exec();
    }
}