import { all, AllEffect } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
export default function* rootSaga(): Generator<AllEffect<SagaIterator>> {
  yield all([]);
}
