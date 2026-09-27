import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Container, ExitButton, HeaderBlock, HeaderRoot, Logo, Nav, NewButton, ThemeRow, ThemeToggle, User, UserMail, UserMenu, UserName } from './Header.styled.js';

export default function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const displayName = (user && user.name) || 'Ivan Ivanov';
  const displayEmail = (user && user.login) || 'ivan.ivanov@gmail.com';

  return (
    <HeaderRoot>
      <Container>
        <HeaderBlock>
          <Logo><Link to="/"><img src="/images/logo.png" alt="logo" /></Link></Logo>
          <Nav>
            <NewButton as={Link} to="/card/create" state={{ background: location }} style={{ color: '#fff' }}>Создать новую задачу</NewButton>
            <User href="#user-set-target">{displayName}</User>
            <UserMenu id="user-set-target">
              <UserName>{displayName}</UserName>
              <UserMail>{displayEmail}</UserMail>
              <ThemeRow>
                <p>Темная тема</p>
                <ThemeToggle />
              </ThemeRow>
              <ExitButton as={Link} to="/exit" state={{ background: location }} style={{ color: 'inherit' }}>Выйти</ExitButton>
            </UserMenu>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderRoot>
  );
}
