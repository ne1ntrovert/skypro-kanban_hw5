import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ExitPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleYes() {
    logout();
    navigate('/login', { replace: true });
  }

  function handleNo() {
    navigate(-1);
  }

  return (
    <div className="pop-exit" id="popExit">
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form">
            <div className="pop-exit__form-group">
              <button type="button" className="pop-exit__exit-yes _hover01" onClick={handleYes}>Да, выйти</button>
              <button type="button" className="pop-exit__exit-no _hover03" onClick={handleNo}>Нет, остаться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
