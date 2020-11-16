import React, { useState } from 'react';
import { useTable, usePagination, useAsyncDebounce } from 'react-table';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';

import DatatablePagination from '../../components/DatatablePagination';
import { Input } from 'reactstrap';

const pageSizeOptions = [5, 10, 20, 30, 40, 50];

function MyTable({
  columns,
  data,
  pageCount: totalPageCount,
  divided = false,
  defaultPageSize = pageSizeOptions[0],
  fetchData,
  loading,
  intl,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
      manualPagination: true,
      pageCount: totalPageCount,
      showPageJump: false,
    },
    // useSortBy,
    usePagination
  );

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchIconClick = (e) => {
    e.stopPropagation();
    search();
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    // gotoPage(0);
    onFetchDataDebounced({ pageIndex: 0, pageSize, searchKeyword });
  };

  const onFetchDataDebounced = useAsyncDebounce(fetchData, 100);

  // When the these table states changes, fetch new data!
  React.useEffect(() => {
    console.log('running');
    onFetchDataDebounced({ pageIndex, pageSize, searchKeyword });
    console.log(pageIndex);
  }, [fetchData, pageIndex, pageSize]);

  const { messages } = intl;

  return (
    <>
      <div className="search">
        <Input
          name="searchKeyword"
          id="searchKeyword"
          placeholder={messages['pages.search-material']}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => handleSearchInputKeyPress(e)}
        />
        <span className="search-icon" onClick={(e) => handleSearchIconClick(e)}>
          <i className="simple-icon-magnifier" />
        </span>
      </div>

      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="henok">
          {loading && <div className="loading" />}

          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={pageSizeOptions}
        showPageSizeOptions={true}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={10}
      />
    </>
  );
}

export default injectIntl(MyTable);
