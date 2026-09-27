import styled from 'styled-components';

export const AuthWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EAEEF6;
`;

export const AuthBlock = styled.div`
  background: #fff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  box-shadow: 0 4px 67px -12px rgba(0, 0, 0, 0.13);
  @media (max-width: 375px) {
    padding: 24px 16px;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
`;

export const AuthTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin: 0 0 20px;
`;

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
  font-family: inherit;
  font-size: 14px;
  line-height: 21px;
  &:not(:last-of-type) {
    margin-bottom: 7px;
  }
  &::placeholder {
    color: #94A6BE;
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  height: 30px;
  background: #565EEF;
  border-radius: 4px;
  margin: 20px 0;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.14px;
  &:hover {
    background: #33399b;
  }
  @media (max-width: 375px) {
    height: 40px;
  }
`;

export const AuthGroup = styled.div`
  text-align: center;
  p, a {
    color: rgba(148, 166, 190, 0.9);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
  }
  a {
    color: #565EEF;
    text-decoration: underline;
  }
`;

export const AuthError = styled.p`
  width: 100%;
  color: #FF6D6D;
  font-size: 13px;
  margin: 0 0 8px;
  text-align: center;
`;
