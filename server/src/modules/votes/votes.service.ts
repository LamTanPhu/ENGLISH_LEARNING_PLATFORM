import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { VoteRepository } from './repositories/vote.repository';

@Injectable()
export class VotesService {
    constructor(private voteRepository: VoteRepository) {}

    async findAll(): Promise<any> {
        return this.voteRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.voteRepository.findOne(id);
    }

    async create(createVoteDto: CreateVoteDto): Promise<any> {
        return this.voteRepository.create(createVoteDto);
    }

    async delete(id: string): Promise<any> {
        return this.voteRepository.delete(id);
    }
}