import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';

import products from '../../../data/products';
import { NavLink } from 'react-router-dom';
import MyTable from '../../../containers/materials/common-table';

const Books = ({ match }) => {
  const [] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, searchKeyword = '' }) => {
      console.log('Fetching');
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          let newProducts = products.filter((product) =>
            product.title.toLocaleLowerCase().includes(searchKeyword)
          );
          setBooks(newProducts.slice(startRow, endRow));
          setPageCount(Math.ceil(newProducts.length / pageSize));
          setLoading(false);
        }
      }, 1000);
    },
    []
  );

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

  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="pages.books" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <MyTable
                columns={cols}
                data={books}
                pageCount={pageCount}
                fetchData={fetchData}
                loading={loading}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(Books);
