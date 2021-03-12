import { actionTypes } from "./action";

// Action interfaces
export interface GetAction {
  type: actionTypes.GET_ACTION;
}

export interface GetActionSuccess {
  type: actionTypes.GET_ACTION_SUCCESS;
  data: any;
}

export interface GetActionFail {
  type: actionTypes.GET_ACTION_FAIL;
  error: Error;
}
