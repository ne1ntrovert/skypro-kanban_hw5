import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import MainPage from '../pages/MainPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import NewTaskPage from '../pages/NewTaskPage.jsx';
import ViewTaskPage from '../pages/ViewTaskPage.jsx';
import EditTaskPage from '../pages/EditTaskPage.jsx';
import ExitPage from '../pages/ExitPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function AppRoutes() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/card/create" element={<ProtectedRoute><NewTaskPage /></ProtectedRoute>} />
        <Route path="/card/:id/edit" element={<ProtectedRoute><EditTaskPage /></ProtectedRoute>} />
        <Route path="/card/:id" element={<ProtectedRoute><ViewTaskPage /></ProtectedRoute>} />
        <Route path="/exit" element={<ProtectedRoute><ExitPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/card/create" element={<ProtectedRoute><NewTaskPage /></ProtectedRoute>} />
          <Route path="/card/:id/edit" element={<ProtectedRoute><EditTaskPage /></ProtectedRoute>} />
          <Route path="/card/:id" element={<ProtectedRoute><ViewTaskPage /></ProtectedRoute>} />
          <Route path="/exit" element={<ProtectedRoute><ExitPage /></ProtectedRoute>} />
        </Routes>
      )}
    </>
  );
}
