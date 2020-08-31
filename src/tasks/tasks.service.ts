import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import {v4 as uuid} from 'uuid';
import {CreateTaskDto } from './dtos/create-task.dto';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { getConnection } from 'typeorm';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    async getAllByFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.searchFilter(filterDto);
    }

    async findById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if(!task){
            throw new NotFoundException(`Task with an ID ${id} not found`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`Task with an ID ${id} not found`);
        }
    }

    async update(id: number, status: TaskStatus): Promise<Task> {
       var task = await this.findById(id);
       task.status = status
       await task.save();
       return task;
    }

    // private tasks: Task[] = [];

    // getAll(): Task[] {
    //     return this.tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // findById(id: string): Task {
    //     const tasks =  this.tasks.find(task => task.id === id)
    //     if(!tasks){
    //         throw new NotFoundException();
    //     }
    //     return tasks;
    // }

    // deleteById(id: string): void {
    //     const taskFound = this.findById(id);
    //     this.tasks = this.tasks.filter(task => task.id === id);
    // }

    // update(id: string, status: TaskStatus): Task {
    //    var task = this.findById(id);
    //    task.status = status
    //    return task
    // }

    // search(getTaskFilterDto: GetTasksFilterDto): Task[]{
    //     const { status, search } = getTaskFilterDto
    //     let tasks = this.getAll();
    //     if(status){
    //         tasks.filter(task => task.status === status);
    //     }
    //     if(search){
    //         tasks.filter(task => task.status.includes(search) || task.description.includes(search));
    //     }
    //     return tasks;
    // }
}
