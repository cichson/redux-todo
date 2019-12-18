import { action, isActionOf } from "typesafe-actions";
import { Epic } from "redux-observable";
import { filter, mapTo } from "rxjs/operators";

import { RootAction, RootState } from "../redux/types";
import { Task, ITask } from "./types";

const addTaskAction = (task: ITask) => action(Task.ADD_TASK, task);

const removeTaskAction = (task: ITask) => action(Task.REMOVE_TASK, task);

const editTaskAction = (task: ITask) => action(Task.EDIT_TASK, task);
/* 
const addTaskWithImage: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(addTaskAction)),
    mapTo(addTaskAction)
); */

export {
  addTaskAction,
  removeTaskAction,
  editTaskAction /* addTaskWithImage */
};
