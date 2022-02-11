import {IUser} from '../../../models/IUser';
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from './types';
import {AppDispatch} from '../../index';
import {clearStorage, storage} from '../../../utils/storage';
import UsersService from '../../../services/UsersService';

const {SET_AUTH, SET_USER, SET_ERROR, SET_IS_LOADING} = AuthActionEnum;

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: SET_USER, payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({
    type: SET_IS_LOADING,
    payload: loading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: SET_ERROR,
    payload: error,
  }),
  logIn: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await UsersService.getUsers();
        const mockUser = response.data.find((user: IUser) => user.username === username && user.password === password) || {
          username, password,
        } as IUser;

        if (mockUser) {
          storage('user', {
            auth: true,
            username: mockUser.username,
          });

          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setIsAuth(true));
          dispatch(AuthActionCreators.setError(''));
        } else {
          dispatch(AuthActionCreators.setError('Incorrect username or password!'));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 700);

    } catch (e) {
      dispatch(AuthActionCreators.setError('Something went wrong while log in!'));
    }
  },
  logOut: () => async (dispatch: AppDispatch) => {
    clearStorage('user');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },

};