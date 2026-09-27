import React from 'react';
import { Cards, ColumnRoot, ColumnTitle } from './Column.styled.js';
import Card from '../Card/Card.jsx';

export default function Column({ title, tasks }) {
  return (
    <ColumnRoot>
      <ColumnTitle><p>{title}</p></ColumnTitle>
      <Cards>
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </Cards>
    </ColumnRoot>
  );
}
