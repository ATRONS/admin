import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';

import products from '../../../data/products';
import { NavLink } from 'react-router-dom';
import MyTable from '../../../containers/materials/common-table';
import apiMagazines from '../../../services/api/magazines';
import apiMaterials from '../../../services/api/materials';

const Magazines = ({ match }) => {
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

          apiMaterials
            .getAll({
              start: startRow,
              size: pageSize,
              search: searchKeyword,
              type: 'MAGAZINE',
            })
            .then((res) => {
              if (res.success) {
                const newMagazines = res.data.materials;
                setBooks(newMagazines.slice(startRow, endRow));
                setPageCount(Math.ceil(res.data.total_materials / pageSize));
              }
              setLoading(false);
            });
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
        cellClass: 'list-item-heading ',
        Cell: (props) => {
          return (
            <NavLink to={`magazines/${props.row.original.id}`}>
              {props.value}
            </NavLink>
          );
        },
      },
      {
        Header: 'Company',
        accessor: 'sales',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Edition',
        accessor: 'category',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Published On',
        accessor: 'createDate',
        cellClass: 'text-muted  ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Selling Price',
        accessor: 'stock',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="pages.magazines" match={match} />
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
                searchPlaceholder="pages.search-magazines"
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(Magazines);
