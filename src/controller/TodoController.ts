import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {ToDo} from "../entity/Todo";

interface FilterOptions {
    category?: string
    completed?: boolean
}

export class ToDoController {

    private todoRepository = getRepository(ToDo);

    async all(request: Request, response: Response, next: NextFunction) {
        let filterOptions: FilterOptions= {}
        if(request.query.category){
            filterOptions.category = request.query.category
        }
        if(request.query.completed){
            filterOptions.completed = request.query.completed
        }

        return this.todoRepository.find(filterOptions);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.todoRepository.findOne(request.params.id);
    }

    async addNew(request: Request, response: Response, next: NextFunction) {
        return this.todoRepository.save({
            description: request.body.description,
            completed: false,
            create_date: new Date(),
            complete_date: new Date('1990-01-01'),
            notes: request.body.notes,
            category: request.body.category,
        });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let taskRemove = await this.todoRepository.findOne(request.params.id);
        await this.todoRepository.remove(taskRemove);
    }

    async markComplete(request: Request, response: Response, next: NextFunction) {
        let taskComplete = await this.todoRepository.findOne(request.params.id);
        
        if (taskComplete.completed === false){
            taskComplete.completed = true;
            taskComplete.complete_date = new Date();
            response.send("Item updated to complete");
            return this.todoRepository.save(taskComplete);
            
        } else {
            response.send("This item is already complete")
        }
    }

    async updateTask(request: Request, response: Response, next: NextFunction) {
        let task = await this.todoRepository.findOne(request.params.id);
        
        if(request.body.description){
            task.description = request.body.description
        }
        if(request.body.notes){
            task.notes = request.body.notes
        }
        if(request.body.category){
            task.category = request.body.category
        }
        response.send("Item updated")
        return this.todoRepository.save(task)
    }

    async listAll(request: Request, response: Response, next: NextFunction) {
        return this.todoRepository.createQueryBuilder("Todo").select(["Todo.description"]).getMany();   
    }

    async filterPersonal(request: Request, response: Response, next: NextFunction) {
        let personalTask = await this.todoRepository.find({category: "Personal"});
        response.send(personalTask);
    }

    async filterWork(request: Request, response: Response, next: NextFunction) {
        let workTask = await this.todoRepository.find({category: "Work"});
        response.send(workTask);
    }

    async filterFamily(request: Request, response: Response, next: NextFunction) {
        let familyTask = await this.todoRepository.find({category: "Family"});
        response.send(familyTask);
    }
}