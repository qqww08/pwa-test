import { put, takeLatest } from "redux-saga/effects";
import { actionTypes, getActionFail, getActionSuccess } from "./action";
import { SagaIterator } from "redux-saga";

function* getActionSaga(action): SagaIterator {
  try {
    yield put(getActionSuccess(?));
  } catch (err) {
    yield put(getActionFail(err));
  }
}

function* actionSaga(): SagaIterator {
  yield takeLatest(actionTypes.GET_ACTION, getActionSaga);
}

export default actionSaga;
