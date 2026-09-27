import React, { useEffect, useState } from 'react';
import { AuthError } from '../../pages/Auth.styled.js';
import { STATUSES, TOPICS, topicColor } from '../../utils/board.js';

export default function PopBrowse({ task, mode = 'view', onClose, onEdit, onSave, onCancel, onDelete }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [topic, setTopic] = useState(task?.topic || TOPICS[0].name);
  const [status, setStatus] = useState(task?.status || STATUSES[0]);
  const [date, setDate] = useState(task?.date || '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setTopic(task?.topic || TOPICS[0].name);
    setStatus(task?.status || STATUSES[0]);
    setDate(task?.date || '');
  }, [task]);

  if (!task) {
    return (
      <div className="pop-browse" id="popBrowse">
        <div className="pop-browse__container">
          <div className="pop-browse__block">
            <div className="pop-browse__content">
              <p>Задача не найдена.</p>
              <button type="button" className="btn-browse__close _btn-bg _hover01" onClick={onClose}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function handleSave() {
    setError('');
    if (!title.trim()) {
      setError('Название задачи не может быть пустым');
      return;
    }
    setSubmitting(true);
    try {
      await onSave({ title: title.trim(), description: description.trim(), topic, status, date });
    } catch (err) {
      setError(err.message || 'Не удалось сохранить задачу');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    setError('');
    setSubmitting(true);
    try {
      await onDelete();
    } catch (err) {
      setError(err.message || 'Не удалось удалить задачу');
      setSubmitting(false);
    }
  }

  const isEdit = mode === 'edit';

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              {isEdit ? (
                <input
                  className="pop-browse__ttl"
                  style={{ border: '1px solid rgba(148,166,190,0.4)', borderRadius: 8, padding: '6px 8px', fontSize: 20, width: '100%' }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <h3 className="pop-browse__ttl">{title}</h3>
              )}
              <div className={`categories__theme theme-top _${topicColor(topic)} _active-category`}>
                <p className={`_${topicColor(topic)}`}>{topic}</p>
              </div>
            </div>

            {error && <AuthError>{error}</AuthError>}

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {STATUSES.map((s) => (
                  <div
                    key={s}
                    className={`status__theme${status === s ? ' _gray' : ''}`}
                    style={isEdit ? { cursor: 'pointer' } : { display: status === s ? 'block' : 'none' }}
                    onClick={() => isEdit && setStatus(s)}
                  >
                    <p className={status === s ? '_gray' : ''}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" onSubmit={(e) => e.preventDefault()}>
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-browse__area"
                    id="textArea01"
                    readOnly={!isEdit}
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
                    {isEdit ? (
                      <input
                        type="date"
                        className="form-new__input"
                        style={{ maxWidth: 170, marginTop: 6 }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    ) : (
                      <span className="date-control">{date}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {(isEdit ? TOPICS : TOPICS.filter((t) => t.name === topic)).map((t) => (
                  <div
                    key={t.name}
                    className={`categories__theme _${t.color}${topic === t.name ? ' _active-category' : ''}`}
                    style={isEdit ? { cursor: 'pointer', opacity: topic === t.name ? 1 : 0.4 } : undefined}
                    onClick={() => isEdit && setTopic(t.name)}
                  >
                    <p className={`_${t.color}`}>{t.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`pop-browse__btn-browse${isEdit ? ' _hide' : ''}`}>
              <div className="btn-group">
                <button type="button" className="btn-browse__edit _btn-bor _hover03" onClick={onEdit}>Редактировать задачу</button>
                <button type="button" className="btn-browse__delete _btn-bor _hover03" disabled={submitting} onClick={handleDelete}>Удалить задачу</button>
              </div>
              <button type="button" className="btn-browse__close _btn-bg _hover01" onClick={onClose}>Закрыть</button>
            </div>
            <div className={`pop-browse__btn-edit${isEdit ? '' : ' _hide'}`}>
              <div className="btn-group">
                <button type="button" className="btn-edit__edit _btn-bg _hover01" disabled={submitting} onClick={handleSave}>
                  {submitting ? 'Сохраняем…' : 'Сохранить'}
                </button>
                <button type="button" className="btn-edit__edit _btn-bor _hover03" onClick={onCancel}>Отменить</button>
                <button type="button" className="btn-edit__delete _btn-bor _hover03" disabled={submitting} onClick={handleDelete}>Удалить задачу</button>
              </div>
              <button type="button" className="btn-edit__close _btn-bg _hover01" onClick={onClose}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
