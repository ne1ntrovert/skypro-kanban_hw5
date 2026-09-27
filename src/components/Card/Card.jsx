import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardContent, CardGroup, CardRoot, CardTitle, DateRow, More, Theme } from './Card.styled.js';
import { topicColor } from '../../utils/board.js';

function CalendarIcon() {
  return (
    <svg fill="none" width="13" height="13" viewBox="0 0 13 13">
      <path d="M10.56 2.03H2.44c-.67 0-1.22.55-1.22 1.22v7.31c0 .67.55 1.22 1.22 1.22h8.12c.67 0 1.22-.55 1.22-1.22V3.25c0-.67-.55-1.22-1.22-1.22Z" stroke="#94A6BE" strokeLinejoin="round" strokeWidth=".8" />
      <path d="M11.78 4.06H1.22M3.25 1.22v.81M9.75 1.22v.81" stroke="#94A6BE" strokeLinecap="round" />
    </svg>
  );
}

export default function Card({ task }) {
  const location = useLocation();
  const cardLink = { pathname: `/card/${task.id}` };
  const cardState = { background: location };

  return (
    <CardRoot>
      <CardGroup>
        <Theme $tone={topicColor(task.topic)}><p>{task.topic}</p></Theme>
        <More as={Link} to={cardLink} state={cardState} aria-label="Открыть задачу"><div /><div /><div /></More>
      </CardGroup>
      <CardContent>
        <Link to={cardLink} state={cardState}><CardTitle>{task.title}</CardTitle></Link>
        <DateRow><CalendarIcon /><p>{task.date}</p></DateRow>
      </CardContent>
    </CardRoot>
  );
}
