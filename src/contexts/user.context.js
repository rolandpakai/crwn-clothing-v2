import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

// Actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action; 
  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: return {
      ...state,
      currentUser: payload
    }
    default: throw new Error(`Unhandled type: ${type}`)
  }
}

const INITIAL_STATE = {
  currentUser: null
};

export const UserProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch(
      createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
    );
  }
  
  const value = {
    currentUser,
    setCurrentUser
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}