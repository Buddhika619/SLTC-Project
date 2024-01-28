import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit'

import userLoginReducer from './reducers/userSlice'
import userUpdateReducer from './reducers/userUpdateSlice'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
})

const store = configureStore(
  { reducer: reducer }
)

export default store
