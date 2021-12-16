const INITIAL_STATE = {
    loggedin: false,
    username: '',
    isadmin: '',
  };
  
  const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    // set loggin bool
    case 'SET_LOGIN':
        return {
          ...state,
          loggedin: action.loggedin,
        }
    // set active username
    case 'SET_USERNAME':
        return {
            ...state,
            username: action.username,
        }
    case 'SET_USERNAME':
        return {
            ...state,
            isadmin: action.isadmin,
        }
  
      default:
        return state;
    }
  };
  
  export default loginReducer;