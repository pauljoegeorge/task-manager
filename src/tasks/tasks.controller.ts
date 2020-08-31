import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { stat } from 'fs';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getAllTasks(): Task[]{
    //     return this.tasksService.getAll();
    // }
    @Get()
    search(@Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getAllByFilter(getTasksFilterDto);
    }

    // // @Query pass it as uri xx.com?status=xx?&search=xx
    // @Get('search')
    // search(@Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto): Task[] {
    //     console.log(getTasksFilterDto);
    //     return this.tasksService.search(getTasksFilterDto);
    // }

    // // @Body will read from HTTP req body 
    // @Post()
    // @UsePipes(ValidationPipe)
    // create(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Body will read from HTTP req body 
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Get(':id')
    // findById(@Param('id') id: string): Task {
    //     return this.tasksService.findById(id);

    // }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.findById(id);

    }

    // // @Param => xxx.com/1/user
    // @Delete(':id')
    // deleteById(@Param('id') id: string){
    //     this.tasksService.deleteById(id);
    // }

    // @Param => xxx.com/1/user
    @Delete(':id')
    deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteById(id);
    }

    // @Patch(':id/:status')
    // update(
    //     @Param('id') id: string,
    //     @Param('status', TaskStatusValidationPipe) status: TaskStatus
    //     ): Task {
    //     return this.tasksService.update(id, status);
    // }

    @Patch(':id/:status')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Param('status', TaskStatusValidationPipe) status: TaskStatus
        ): Promise<Task> {
        return this.tasksService.update(id, status);
    }

}
