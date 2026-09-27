import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { AuthBlock, AuthButton, AuthError, AuthForm, AuthGroup, AuthInput, AuthTitle, AuthWrap } from './Auth.styled.js';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !login.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }
    setSubmitting(true);
    try {
      await register(name.trim(), login.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Не удалось зарегистрироваться');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthWrap>
      <AuthBlock>
        <AuthTitle>Регистрация</AuthTitle>
        <AuthForm onSubmit={handleSubmit} noValidate>
          {error && <AuthError>{error}</AuthError>}
          <AuthInput type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} disabled={submitting} />
          <AuthInput type="text" placeholder="Эл. почта" value={login} onChange={(e) => setLogin(e.target.value)} disabled={submitting} />
          <AuthInput type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitting} />
          <AuthButton type="submit" disabled={submitting}>{submitting ? 'Регистрируем…' : 'Зарегистрироваться'}</AuthButton>
          <AuthGroup>
            <p>Уже есть аккаунт? <Link to="/login">Войдите здесь</Link></p>
          </AuthGroup>
        </AuthForm>
      </AuthBlock>
    </AuthWrap>
  );
}
