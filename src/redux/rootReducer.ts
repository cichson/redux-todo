import { combineReducers } from "redux";

import { taskReducer, initialTaskState } from "../tasks/reducer";

const rootInitialState = {
  taskReducer: initialTaskState
};

const rootReducer = combineReducers({
  taskReducer
});

export { rootInitialState, rootReducer };
