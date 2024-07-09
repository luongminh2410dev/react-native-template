import { applyMiddleware, combineReducers, createStore } from 'redux'
import { all } from 'redux-saga/effects'
import appReducer from '@app/app-reduxs/app/reducer'
import profileReducer from '@app/app-reduxs/profile/reducer'
import createSagaMiddleware from 'redux-saga'
import appSaga from './app/saga'
const sagaMiddleWare = createSagaMiddleware()

function* rootSaga() {
	yield all([appSaga()])
	// code after all-effect
}
const allReducers = combineReducers({
	appReducer,
	profileReducer,
})
const rootReducers = (state: any, action: any) => {
	return allReducers(state, action)
}
function logger({ getState }: { getState: any }) {
	return (next: (arg0: any) => any) => (action: any) => {
		// log("will dispatch:", action);

		const returnValue = next(action)
		// log("state after dispatch:", getState());

		return returnValue
	}
}

const store = createStore(rootReducers, applyMiddleware(sagaMiddleWare, logger))
sagaMiddleWare.run(rootSaga)

export type RootState = ReturnType<typeof rootReducers>
export default store
