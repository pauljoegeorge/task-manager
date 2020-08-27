import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAll();
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get(':id')
    findById(@Param('id') id: string): Task {
        return this.tasksService.findById(id);

    }

    @Delete(':id')
    deleteById(@Param('id') id: string){
        this.tasksService.deleteById(id);
    }

    @Patch(':id/:status')
    update(
        @Param('id') id: string,
        @Param('status') status: TaskStatus
        ): Task {
        return this.tasksService.update(id, status);
    }
}
