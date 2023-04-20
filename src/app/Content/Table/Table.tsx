import type { TodosDTO } from '../types';

import './Table.scss';

const columns = [
  { label: 'ID', key: 'id', width: '5%' },
  { label: 'User', key: 'user', width: '10%' },
  { label: 'Title', key: 'title', width: '55%' },
  { label: 'Status', key: 'status', width: '15%' },
  { label: 'Actions', key: 'actions', width: '15%' },
];

interface TableProps {
  data: TodosDTO;
}

export function Table(props: TableProps) {
  const { data } = props;

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
        {data.map((item, index) => (
          <div key={index} className="table-row">
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
              <button className="buttons">Edit</button>
              <button className="buttons">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
