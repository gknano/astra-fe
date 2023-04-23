import { useContext, useState } from 'react';

import { filterData } from './api';
import { TodosContext } from '../../Context';

import { userOptions, statusOptions } from './utils';

import type { AxiosResponse } from 'axios';
import type { TodosDTO } from '../../Context/types';
import type { IFilters } from './types';

import './Navbar.scss';

export function Navbar() {
  const { setContextState } = useContext(TodosContext);
  const [userFilter, setUserFilter] = useState<string | null>(null);
  const [completedFilter, setCompletedFilter] = useState<string | null>(null);

  const handleUserFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserFilter(event.target.value);
  };

  const handleCompletedFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCompletedFilter(event.target.value);
  };

  const applyFilters = (filters?: IFilters) => {
    filterData(filters || {})
      .then((response: AxiosResponse<TodosDTO>) => {
        const todos = response.data;
        setContextState(todos);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const resetFilters = () => {
    setUserFilter(null);
    setCompletedFilter(null);
    applyFilters();
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const filters: IFilters = {};
    if (userFilter) {
      filters.userId = userFilter;
    }

    if (completedFilter) {
      filters.completed = completedFilter;
    }
    applyFilters(filters);
  };

  return (
    <nav className="navbar">
      <div className="filter-menu">
        <div className="filter-menu__item">
          <label htmlFor="user-filter">User</label>
          <select
            id="user-filter"
            value={userFilter || ''}
            onChange={handleUserFilterChange}
          >
            {userOptions.map((user) => (
              <option key={user.id} value={user.value}>
                {user.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-menu__item">
          <label htmlFor="completed-filter">Status</label>
          <select
            id="completed-filter"
            value={completedFilter || ''}
            onChange={handleCompletedFilterChange}
          >
            {statusOptions.map((status) => (
              <option key={status.id} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Apply
        </button>
        <button type="button" onClick={resetFilters}>
          Clear
        </button>
      </div>
    </nav>
  );
}
