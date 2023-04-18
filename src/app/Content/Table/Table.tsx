import type { TodosDTO } from '../types';

import './Table.scss';

const students = [
  { id: 1, user: '', title: 0, status: 'done', actions: '' },
  { id: 2, user: '', title: 0, status: 'done', actions: '' },
];

const header = ['id', 'user', 'title', 'status', 'actions'];

interface TableProps {
  columns: TodosDTO;
}

export function Table(props: TableProps) {
  const { columns } = props;

  const TableHeader = () => {
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const TableData = () => {
    return columns.map(({ userId, id, title, completed }) => {
      return (
        <tr key={id}>
          <td className="text-id">{id}</td>
          <td>User {userId}</td>
          <td>{title}</td>
          <td>{completed}</td>
          <td>Delete Edit</td>
        </tr>
      );
    });
  };

  return (
    <div className="table-container">
      <h1 className="title">Todo List:</h1>
      <table>
        <tbody>
          <tr>{TableHeader()}</tr>
          {TableData()}
        </tbody>
      </table>
    </div>
  );
}
