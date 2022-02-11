import React from 'react';
import {Navigate, RouteObject} from 'react-router-dom';
import CalendarPage from '../pages/CalendarPage';
import LoginPage from '../pages/LoginPage';

export enum RouteNames {
  LOGIN = '/login',
  CALENDAR = '/',
}

export const publicRoutes: RouteObject[] = [
  {
    path: RouteNames.LOGIN,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to={RouteNames.LOGIN} />,
  },
];

export const privateRoutes: RouteObject[] = [
  {
    path: RouteNames.CALENDAR,
    element: <CalendarPage />,
  },
  {
    path: '*',
    element: <Navigate to={RouteNames.CALENDAR} />,
  },
];