import React from 'react';
import { NotFoundBack, NotFoundCode, NotFoundText, NotFoundWrap } from './NotFoundPage.styled.js';

export default function NotFoundPage() {
  return (
    <NotFoundWrap>
      <NotFoundCode>404</NotFoundCode>
      <NotFoundText>Страница не найдена</NotFoundText>
      <NotFoundBack to="/">На главную</NotFoundBack>
    </NotFoundWrap>
  );
}
