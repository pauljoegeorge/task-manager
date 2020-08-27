import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAll();
    }

    @Post()
    create(
        @Body('title') title: string,
        @Body('description') description: string,
    ) {
        console.log('title', title);
        console.log('description', description);
        this.tasksService.createTask(title, description);
        return { title, description};
    }
}
