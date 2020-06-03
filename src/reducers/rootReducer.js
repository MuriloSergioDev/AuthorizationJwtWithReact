import { combineReducers } from 'redux';

//import { reducer } from './authentication.reducer';
import { reducer as counterReducer}  from './counter.reducer';
import { reducer as authReducer}  from './auth.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
});

//console.log(counterReducer);
export default rootReducer;