import * as actionIs from "./interface";

export enum actionTypes {
  GET_ACTION = "GET_ACTION",
  GET_ACTION_SUCCESS = "GET_ACTION_SUCCESS",
  GET_ACTION_FAIL = "GET_ACTION_FAIL",
}

export type Action =
  | actionIs.GetAction
  | actionIs.GetActionSuccess
  | actionIs.GetActionFail;

export function getAction(): actionIs.GetAction {
  return { type: actionTypes.GET_ACTION };
}

export function getActionSuccess(data: any): actionIs.GetActionSuccess {
  return {
    type: actionTypes.GET_ACTION_SUCCESS,
    data,
  };
}

export function getActionFail(error: Error): actionIs.GetActionFail {
  return {
    type: actionTypes.GET_ACTION_FAIL,
    error,
  };
}
