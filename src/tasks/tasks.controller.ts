import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAll();
    }

    // @Query pass it as uri xx.com?status=xx?&search=xx
    @Get('search')
    search(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
        console.log(getTasksFilterDto);
        return this.tasksService.search(getTasksFilterDto);
    }

    // @Body will read from HTTP req body 
    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get(':id')
    findById(@Param('id') id: string): Task {
        return this.tasksService.findById(id);

    }

    // @Param => xxx.com/1/user
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
