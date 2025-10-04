import React from 'react';
import { MODE } from '../constants/modes';


function Control({ onChangeMode }) {
  const controls = [
    { mode: MODE.CREATE, label: 'Create', type: 'link' },
    { mode: MODE.UPDATE, label: 'Update', type: 'link' },
    { mode: MODE.DELETE, label: 'Delete', type: 'button' }
  ];

  const handleClick = (e, mode) => {
    e.preventDefault();
    onChangeMode(mode);
  };

  return (
    <ul>
      {controls.map(({ mode, label, type }) => (
        <li key={mode}>
          {type === 'link' ? (
            <a 
              href={`/${mode}`}
              onClick={(e) => handleClick(e, mode)}
            >
              {label}
            </a>
          ) : (
            <button onClick={() => onChangeMode(mode)}>
              {label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Control;