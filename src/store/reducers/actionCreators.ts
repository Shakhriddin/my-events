import {AuthActionCreators} from './auth/AuthActionCreators';
import {EventActionCreators} from './event/EventActionCreators';

export const actionCreators = {
  ...AuthActionCreators,
  ...EventActionCreators,
};