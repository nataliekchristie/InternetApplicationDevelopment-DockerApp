const initialState = () => ({
    loggedin: false,
    username: '',
  });
  
  const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    // set loggin bool
    case 'SET_LOGIN':
        return {
          ...state,
          loggedin:action.loggedin,
        }
    // set active username
    case 'SET_USERNAME':
        return {
            ...state,
            username: username,
        }
  
      default:
        return state;
    }
  };
  
  export default loginReducer;