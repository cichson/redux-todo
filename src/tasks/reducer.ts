import { createReducer } from "typesafe-actions";
import { clone, merge, mergeWith, isNil } from "lodash";

import { Task, ITask, TaskState, TaskActions } from "./types";

const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as ITask[];

const initialTaskState: TaskState = {
  tasks
};

const taskReducer = createReducer<TaskState, TaskActions>(initialTaskState, {
  [Task.ADD_TASK]: (state, action) => {
    const updatedTasks = clone(state.tasks);
    updatedTasks.push(action.payload);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return merge(state, { tasks: updatedTasks });
  },
  [Task.REMOVE_TASK]: (state, action) => {
    const currentTasks = clone(state.tasks);
    const updatedTasks = currentTasks.filter(
      task => task.name !== action.payload.name && task.id !== action.payload.id
    );

    // Save to local state
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return mergeWith(state, { tasks: updatedTasks }, (obj, src) => {
      if (!isNil(src)) {
        return src;
      }
      return obj;
    });
  },
  [Task.EDIT_TASK]: (state, action) => {
    const updatedTasks = clone(state.tasks);
    const objIndex = updatedTasks.findIndex(
      obj => obj.id === action.payload.id
    );
    updatedTasks[objIndex].name = action.payload.name;

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return merge(state, { tasks: updatedTasks });
  }
});
export { initialTaskState, taskReducer };
