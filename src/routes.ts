import {UserController} from "./controller/UserController";
import {ToDoController} from "./controller/TodoController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "get",
    route: "/todos",
    controller: ToDoController,
    action: "all"
}, {
    method: "get",
    route: "/todos/:id",
    controller: ToDoController,
    action: "one"
}, {
    method: "post",
    route: "/todos",
    controller: ToDoController,
    action: "addNew"
}, {
    method: "delete",
    route: "/todos/:id",
    controller: ToDoController,
    action: "remove"
}, {
    method: "put",
    route: "/todos/:id",
    controller: ToDoController,
    action: "markComplete"
}, {
    method: "post",
    route: "/todos/updatetask/:id",
    controller: ToDoController,
    action: "updateTask"
}, {
    method: "get",
    route: "/listall",
    controller: ToDoController,
    action: "listAll"
}
,{
    method: "get",
    route: "/todospersonal",
    controller: ToDoController,
    action: "filterPersonal"
},{
    method: "get",
    route: "/todoswork",
    controller: ToDoController,
    action: "filterWork"
},{
    method: "get",
    route: "/todosfamily",
    controller: ToDoController,
    action: "filterFamily"
}
];