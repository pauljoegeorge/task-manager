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
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    async getAllByFilter(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.searchFilter(filterDto, user);
    }

    async findById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({where: {id: id, userId: user.id}});
        if(!task){
            throw new NotFoundException(`Task with an ID ${id} not found`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteById(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({id, userId: user.id});
        console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`Task with an ID ${id} not found`);
        }
    }

    async update(id: number, status: TaskStatus, user: User): Promise<Task> {
       var task = await this.findById(id, user);
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
