import { ActionType } from "typesafe-actions";
import * as taskActions from "./actions";

export type TaskActions = ActionType<typeof taskActions>;

export interface ITask {
  id: string;
  name: string;
}

export interface TaskState {
  tasks: ITask[];
  currentTask?: ITaskItem[];
}

export interface ITaskItem {
  task: ITask;
}

/* Action Constants */
export enum Task {
  ADD_TASK = "task/ADD_TASK",
  REMOVE_TASK = "task/REMOVE_TASK",
  EDIT_TASK = "task/EDIT_TASK"
}
