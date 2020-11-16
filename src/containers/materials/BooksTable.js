import React from 'react';
import { NavLink } from 'react-router-dom';

import MyTable from './common-table';

const BooksTable = ({ books, totalRowCount }) => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => {
          return (
            <NavLink to={`${props.row.original.id}`}>{props.value}</NavLink>
          );
        },
      },
      {
        Header: 'Author',
        accessor: 'sales',
        cellClass: 'text-muted w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'ISBN',
        accessor: 'stock',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Actions',
        accessor: 'category',
        cellClass: 'text-muted w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return <MyTable columns={cols} data={books} totalRowCount={totalRowCount} />;
};

export default BooksTable;
