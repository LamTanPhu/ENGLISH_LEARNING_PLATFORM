import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { VotesService } from './votes.service';

@Controller('votes')
@UseGuards(AuthGuard('jwt'))
export class VotesController {
    constructor(private votesService: VotesService) {}

    @Get()
    async findAll() {
        return this.votesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.votesService.findOne(id);
    }

    @Post()
    async create(@Body() createVoteDto: CreateVoteDto) {
        return this.votesService.create(createVoteDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.votesService.delete(id);
    }
}