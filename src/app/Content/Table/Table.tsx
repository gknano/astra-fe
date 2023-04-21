import { memo } from 'react';

import type { TodosDTO } from '../types';

import './Table.scss';

const columns = [
  { label: 'ID', width: '5%' },
  { label: 'User', width: '10%' },
  { label: 'Title', width: '55%' },
  { label: 'Status', width: '15%' },
  { label: 'Actions', width: '15%' },
];

interface TableProps {
  data: TodosDTO;
  onClickOpen: () => void;
}

export function Table(props: TableProps) {
  const { data, onClickOpen } = props;

  return (
    <div className="table-container">
      <div className="table-header">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`table-header-column column-${index}`}
            style={{ width: column.width }}
          >
            {column.label}
          </div>
        ))}
      </div>
      <div className="table-body">
        {data.map((item) => (
          <div key={item.id} className="table-row">
            <div
              className="table-row-column column-0"
              style={{ width: columns[0].width }}
            >
              {item.id}
            </div>
            <div
              className="table-row-column column-1"
              style={{ width: columns[1].width }}
            >
              User {item.userId}
            </div>
            <div
              className="table-row-column column-2"
              style={{ width: columns[2].width }}
            >
              {item.title}
            </div>
            <div
              className="table-row-column column-3"
              style={{ width: columns[3].width }}
            >
              {item.completed ? 'Done' : 'Not done'}
            </div>
            <div className="table-row-column column-4">
              <button className="buttons" onClick={onClickOpen}>
                Edit
              </button>
              <button className="buttons">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const MemoizeTable = memo(Table);
