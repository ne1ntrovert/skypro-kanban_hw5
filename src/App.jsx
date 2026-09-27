import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './legacy-popups.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import AppRoutes from './app/AppRoutes.jsx';

const GlobalStyle = createGlobalStyle`*,*::before,*::after{box-sizing:border-box}html,body,#root{width:100%;min-height:100%}html,body{margin:0;font-family:"Roboto",Arial,sans-serif;color:#000}body{min-width:320px}a{text-decoration:none;cursor:pointer}button{cursor:pointer;font-family:inherit}ul,ol{margin:0;padding:0;list-style:none}`;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <GlobalStyle />
          <div className="wrapper">
            <AppRoutes />
          </div>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
