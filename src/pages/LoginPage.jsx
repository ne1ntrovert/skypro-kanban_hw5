import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { AuthBlock, AuthButton, AuthError, AuthForm, AuthGroup, AuthInput, AuthTitle, AuthWrap } from './Auth.styled.js';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!login.trim() || !password.trim()) {
      setError('Введите эл. почту и пароль');
      return;
    }
    setSubmitting(true);
    try {
      await doLogin(login.trim(), password);
      const redirectTo = location.state && location.state.from ? location.state.from.pathname : '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Не удалось войти');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthWrap>
      <AuthBlock>
        <AuthTitle>Вход</AuthTitle>
        <AuthForm onSubmit={handleSubmit} noValidate>
          {error && <AuthError>{error}</AuthError>}
          <AuthInput type="text" placeholder="Эл. почта" value={login} onChange={(e) => setLogin(e.target.value)} disabled={submitting} />
          <AuthInput type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitting} />
          <AuthButton type="submit" disabled={submitting}>{submitting ? 'Входим…' : 'Войти'}</AuthButton>
          <AuthGroup>
            <p>Нужно зарегистрироваться? <Link to="/register">Регистрируйтесь здесь</Link></p>
          </AuthGroup>
        </AuthForm>
      </AuthBlock>
    </AuthWrap>
  );
}
