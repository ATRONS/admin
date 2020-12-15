import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { FormattedDate, injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import MyTable from '../../../containers/materials/common-table';
import { books_dummy } from '../../../data/book';
import apiMaterials, { loadAll } from '../../../services/api/materials';
import { apiBooks } from '../../../services/api';
import Rating from '../../../components/common/Rating';
import { formatMoney } from '../../../helpers/sales';

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
      // loadAll();
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        // apiBooks.getAll({ startRow, pageSize, searchKeyword });
        apiMaterials
          .getAll({
            startRow: startRow,
            size: pageSize,
            search: searchKeyword,
            type: 'BOOK',
          })
          .then((res) => {
            if (res.success) {
              const newBooks = res.data.materials;
              setBooks(newBooks);
              setPageCount(Math.ceil(res.data.total_materials / pageSize));
            }
            setLoading(false);
          });
      }
    },
    []
  );

  const cols = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => {
          return (
            <NavLink to={`books/${props.row.original._id}`}>
              {props.value}
            </NavLink>
          );
        },
      },
      {
        Header: 'Author',
        accessor: 'provider.legal_name',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'ISBN',
        accessor: 'ISBN',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: 'Published On',
        accessor: 'created_at',
        cellClass: 'text-muted  ',
        Cell: (props) => <> {FormattedDate(props.value)}</>,
      },
      {
        Header: 'Selling Price',
        accessor: 'price.selling',
        cellClass: 'text-muted ',
        Cell: (props) => <>{formatMoney(props.value)}</>,
      },

      {
        Header: 'Rating',
        accessor: 'rating.value',
        cellClass: 'text-muted ',
        Cell: (props) => (
          <Rating total={5} rating={props.value} interactive={false} />
        ),
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
                searchPlaceholder="pages.search-books"
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(Books);
