import { Injectable } from '@nestjs/common';
import { CreateSubtaskDto } from './create-subtask.dto';
import { UpdateSubtaskDto } from './update-subtask.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './subtask.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto) {
    return await this.subtaskRepository.save(createSubtaskDto);
  }

  async findAll() {
    return await this.subtaskRepository.find();
  }

  async findOne(id: string) {
    return await this.subtaskRepository.findOneBy({ id });
  }

  async update(subTask: Subtask, updateSubtaskDto: UpdateSubtaskDto) {
    Object.assign(subTask, updateSubtaskDto);
    return await this.subtaskRepository.save(subTask);
  }

  remove(id: string) {
    return this.subtaskRepository.delete(id);
  }
}
