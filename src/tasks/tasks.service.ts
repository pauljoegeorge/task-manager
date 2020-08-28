import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid';
import {CreateTaskDto } from './dtos/create-task.dto';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    findById(id: string): Task {
        const tasks =  this.tasks.find(task => task.id === id)
        if(!tasks){
            throw new NotFoundException();
        }
        return tasks;
    }

    deleteById(id: string): void {
        const taskFound = this.findById(id);
        this.tasks = this.tasks.filter(task => task.id === id);
    }

    update(id: string, status: TaskStatus): Task {
       var task = this.findById(id);
       task.status = status
       return task
    }

    search(getTaskFilterDto: GetTasksFilterDto): Task[]{
        const { status, search } = getTaskFilterDto
        let tasks = this.getAll();
        if(status){
            tasks.filter(task => task.status === status);
        }
        if(search){
            tasks.filter(task => task.status.includes(search) || task.description.includes(search));
        }
        return tasks;
    }
}
