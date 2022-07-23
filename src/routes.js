import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import MovieListView from 'src/views/product/MovieListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import MoviePage from './views/product/MoviePageView';

const routes = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'index', element: <DashboardView /> },
      { path: 'movies', element: <MovieListView /> },
      { path: 'movie', element: <MoviePage /> },
      { path: 'settings', element: <SettingsView /> },
    ]
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/dashboard/movies" /> },
      { path: '*', element: <Navigate to="/dashboard/index" /> }
    ]
  }
];

export default routes;
