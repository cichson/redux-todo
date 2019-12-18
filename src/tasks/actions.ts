import { action } from "typesafe-actions";

import { Task, ITask } from "./types";

const addTaskAction = (task: ITask) => action(Task.ADD_TASK, task);

const removeTaskAction = (task: ITask) => action(Task.REMOVE_TASK, task);

const editTaskAction = (task: ITask) => action(Task.EDIT_TASK, task);

export { addTaskAction, removeTaskAction, editTaskAction };
