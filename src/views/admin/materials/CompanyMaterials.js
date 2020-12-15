import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { FormattedDate, injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';

import products from '../../../data/products';
import { NavLink } from 'react-router-dom';
import MyTable from '../../../containers/materials/common-table';
import apiMaterials from '../../../services/api/materials';
import Rating from '../../../components/common/Rating';
import { formatMoney } from '../../../helpers/sales';

const CompanyMaterials = ({ match, type }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  useEffect(() => {
    setMaterials([]);
  }, [type]);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, materialType, searchKeyword = '' }) => {
      console.log('who', materialType);
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;

          apiMaterials
            .getAll({
              startRow: startRow,
              size: pageSize,
              search: searchKeyword,
              type: materialType,
            })
            .then((res) => {
              if (res.success) {
                const newMagazines = res.data.materials;
                setMaterials(newMagazines);
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
            <NavLink to={`${type}/${props.row.original._id}`}>
              {props.value} - {props.row.original.edition}
            </NavLink>
          );
        },
      },
      {
        Header: type == 'magazines' ? 'Edition' : 'Number',
        accessor: 'edition',
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
    [type]
  );

  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb
            heading={type == 'magazine' ? 'pages.magazines' : 'pages.newspaper'}
            match={match}
          />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <MyTable
                columns={cols}
                data={materials}
                pageCount={pageCount}
                fetchData={fetchData}
                type={type}
                loading={loading}
                searchPlaceholder={
                  type == 'magazine'
                    ? 'pages.search-magazines'
                    : 'pages.search-newspapers'
                }
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(CompanyMaterials);
