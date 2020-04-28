import { combineReducers } from 'redux-immutable'

import { reducer as fixRecordReducer } from '../views/fixRecord/store'
import { reducer as installRecordReducer } from '../views/installRecord/store'
import { reducer as deviceManage } from '../views/newAppPages/myFocus/store'
import { reducer as deviceMess } from '../views/appPages/myFocus/store'
import { reducer as orderReducer } from '../views/orderManagementRedux/store'
import { reducer as focusReducer } from '../views/newAppPages/myFocus/store'
import {reducer as recordReducer } from '../views/appPages/Record/store'
const reducer = combineReducers({
  fixRecord: fixRecordReducer,
  installRecord: installRecordReducer,
  deviceManageDetail: deviceManage,
  deviceMessDetail: deviceMess,
  orderManage: orderReducer,
  focusDetailInfo: focusReducer,
  Record: recordReducer
})

export default reducer
