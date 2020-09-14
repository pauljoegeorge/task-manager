import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { stat } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { userInfo } from 'os';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getAllTasks(): Task[]{
    //     return this.tasksService.getAll();
    // }
    @Get()
    search(@Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getAllByFilter(getTasksFilterDto, user);
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
    create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    // @Get(':id')
    // findById(@Param('id') id: string): Task {
    //     return this.tasksService.findById(id);

    // }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.tasksService.findById(id, user);

    }

    // // @Param => xxx.com/1/user
    // @Delete(':id')
    // deleteById(@Param('id') id: string){
    //     this.tasksService.deleteById(id);
    // }

    // @Param => xxx.com/1/user
    @Delete(':id')
    deleteById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.tasksService.deleteById(id, user);
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
        @Param('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
        ): Promise<Task> {
        return this.tasksService.update(id, status, user);
    }

}
