import { all } from 'redux-saga/effects';
import {ExcelSaga} from './ExcelSaga'

export default function* rootSaga() {
  yield all([
    ...ExcelSaga
  ]);
}