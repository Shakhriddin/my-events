import {AuthAction, AuthActionEnum, AuthState} from './types';
import {IUser} from '../../../models/IUser';

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  user: {} as IUser,
  error: '',
};

export default function AuthReducer(state = initialState, action: AuthAction): AuthState {
  
  const {SET_IS_LOADING, SET_AUTH, SET_USER, SET_ERROR} = AuthActionEnum;

  switch (action.type) {

    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
        isLoading: false,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}