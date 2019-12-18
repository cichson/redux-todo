import { ActionType } from "typesafe-actions";
import * as taskActions from "./actions";

export type TaskActions = ActionType<typeof taskActions>;

export interface ITask {
  id: string;
  name: string;
}

export interface ITaskPair {
  id: string;
  domain: string;
  range: string;
}

export interface ITaskPairSaveItem extends ITaskPair {
  taskId: string;
}

export interface TaskState {
  tasks: ITask[];
  currentTask?: ITaskItem[];
  editState?: ITaskPair[];
}

export interface ITaskItem {
  dict: ITask;
  pair: ITaskPair;
}

/* Action Constants */
export enum Task {
  ADD_TASK = "task/ADD_TASK",
  REMOVE_TASK = "task/REMOVE_TASK",
  EDIT_TASK = "task/EDIT_TASK"
}
