import {EventAction, EventActionEnum, EventState} from './types';
import {IUser} from '../../../models/IUser';
import {IEvent} from '../../../models/IEvent';

const initialState: EventState = {
  guests: [] as IUser[],
  events: [] as IEvent[],
  isLoading: false,
  error: '',
};

export default function CalendarReducer(state = initialState, action: EventAction): EventState {
  const {SET_GUESTS, SET_EVENTS, SET_IS_LOADING, SET_ERROR} = EventActionEnum;
  switch (action.type) {
    case SET_GUESTS:
      return {
        ...state,
        guests: action.payload,
        isLoading: false,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
        isLoading: false,
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