import React, { useState } from 'react';
import { AuthError } from '../../pages/Auth.styled.js';
import { TOPICS, todayIso } from '../../utils/board.js';

export default function PopNewCard({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState(TOPICS[0].name);
  const [date, setDate] = useState(todayIso());
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate() {
    setError('');
    if (!title.trim()) {
      setError('Введите название задачи');
      return;
    }
    setSubmitting(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim(), topic, date, status: 'Без статуса' });
    } catch (err) {
      setError(err.message || 'Не удалось создать задачу');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="/" className="pop-new-card__close" onClick={(e) => { e.preventDefault(); onClose && onClose(); }}>&#10006;</a>
            {error && <AuthError>{error}</AuthError>}
            <div className="pop-new-card__wrap">
              <form className="pop-new-card__form form-new" onSubmit={(e) => e.preventDefault()}>
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <input
                    className="form-new__input"
                    type="text"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-new__area"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
              <div className="pop-new-card__calendar calendar">
                <p className="calendar__ttl subttl">Даты</p>
                <div className="calendar__block">
                  <div className="calendar__period">
                    <p className="calendar__p date-end">Срок исполнения:</p>
                    <input
                      type="date"
                      className="form-new__input"
                      style={{ maxWidth: 170, marginTop: 6 }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {TOPICS.map((t) => (
                  <div
                    key={t.name}
                    className={`categories__theme _${t.color}${topic === t.name ? ' _active-category' : ''}`}
                    style={{ cursor: 'pointer', opacity: topic === t.name ? 1 : 0.4 }}
                    onClick={() => setTopic(t.name)}
                  >
                    <p className={`_${t.color}`}>{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="form-new__create _hover01" type="button" disabled={submitting} onClick={handleCreate}>
              {submitting ? 'Создаём…' : 'Создать задачу'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
