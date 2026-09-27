import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #F1F1F1;
  text-align: center;
  padding: 20px;
`;

export const NotFoundCode = styled.p`
  margin: 0;
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  color: #565EEF;
`;

export const NotFoundText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #000;
`;

export const NotFoundBack = styled(Link)`
  margin-top: 8px;
  color: #fff;
  background: #565EEF;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background: #33399b;
  }
`;
