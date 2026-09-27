import React from 'react';
import { MainBlock, MainContainer, MainContent, MainRoot } from './Main.styled.js';
import Column from '../Column/Column.jsx';
import { useTasks } from '../../context/TasksContext.jsx';
import { STATUSES } from '../../utils/board.js';

export default function Main() {
  const { tasks, loading, error } = useTasks();

  return (
    <MainRoot>
      <MainContainer>
        <MainBlock>
          {loading && <p style={{ padding: '20px 0' }}>Загрузка задач…</p>}
          {!loading && error && <p style={{ padding: '20px 0', color: '#FF6D6D' }}>{error}</p>}
          {!loading && !error && (
            <MainContent>
              {STATUSES.map((status, i) => (
                <Column
                  key={status}
                  colIndex={i}
                  title={status}
                  tasks={tasks.filter((t) => t.status === status)}
                />
              ))}
            </MainContent>
          )}
        </MainBlock>
      </MainContainer>
    </MainRoot>
  );
}
