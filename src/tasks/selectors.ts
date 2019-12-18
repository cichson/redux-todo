import { RootState } from "../redux/types";

const tasks = (state: RootState) => state.taskReducer.tasks;

const task = (state: RootState) =>
  state.taskReducer.currentTask &&
  state.taskReducer.currentTask.map((pair, index) => ({
    key: index,
    ...pair
  }));

const editState = (state: RootState) => state.taskReducer.editState || [];

export { tasks, task, editState };
