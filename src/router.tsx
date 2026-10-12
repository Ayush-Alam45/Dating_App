import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from './features/landing/LandingPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { OtpVerificationPage } from './features/auth/OtpVerificationPage';
import { CompleteProfilePage } from './features/onboarding/CompleteProfilePage';
import { AppLayout } from './components/layout/AppLayout';
import { DiscoveryPage } from './features/discovery/DiscoveryPage';
import { LikesPage } from './features/likes/LikesPage';
import { MatchesPage } from './features/matches/MatchesPage';
import { MessagesPage } from './features/messages/MessagesPage';
import { ExplorePage } from './features/explore/ExplorePage';
import { SettingsPage } from './features/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/verify-otp',
    element: <OtpVerificationPage />
  },
  {
    path: '/complete-profile',
    element: <CompleteProfilePage />
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/discovery',
        element: <DiscoveryPage />
      },
      {
        path: '/home',
        element: <Navigate to="/discovery" replace />
      },
      {
        path: '/likes',
        element: <LikesPage />
      },
      {
        path: '/matches',
        element: <MatchesPage />
      },
      {
        path: '/messages',
        element: <MessagesPage />
      },
      {
        path: '/explore',
        element: <ExplorePage />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

