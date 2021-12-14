import axios from 'axios';

export const updateLogin = loggedin => {
    return {
      type: 'SET_LOGIN',
      loggedin,
    };
  };

  export const updateUsername = username => {
    return {
      type: 'SET_USERNAME',
      username,
    };
  };