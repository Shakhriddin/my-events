import {
  EventActionEnum,
  SetErrorAction,
  SetEventsAction,
  SetGuestsAction,
  SetIsLoadingAction,
} from './types';
import {IUser} from '../../../models/IUser';
import {IEvent} from '../../../models/IEvent';
import {AppDispatch} from '../../index';
import UsersService from '../../../services/UsersService';
import {storage} from '../../../utils/storage';

const {SET_GUESTS, SET_ERROR, SET_EVENTS, SET_IS_LOADING} = EventActionEnum;

export const EventActionCreators = {
  setGuests: (guests: IUser[]): SetGuestsAction => ({
    type: SET_GUESTS,
    payload: guests,
  }),
  setEvents: (events: IEvent[]): SetEventsAction => ({
    type: SET_EVENTS,
    payload: events,
  }),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({
    type: SET_IS_LOADING,
    payload: loading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: SET_ERROR,
    payload: error,
  }),
  loadGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UsersService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (e) {
      dispatch(EventActionCreators.setError('Something went wrong while loading guests!'));
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events: IEvent[] = storage('events') as IEvent[];
      events.push(event);

      dispatch(EventActionCreators.setEvents(events.filter(ev => ev.author === event.author || ev.guest === event.author)));

      storage('events', events);
    } catch (e) {
      dispatch(EventActionCreators.setError('Something went wrong while adding new event!'));
    }
  },
  loadEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(EventActionCreators.setIsLoading(true));
      const events: IEvent[] = storage('events') as IEvent[];
      const currentUserEvents = events.filter(ev => ev.author === username || ev.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
      dispatch(EventActionCreators.setIsLoading(false));

    } catch (e) {
      dispatch(EventActionCreators.setError('Something went wrong while loading events!'));
    }
  },
};