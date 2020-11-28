import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { CardTitle, Row, Table } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';
import { earnings_by_material } from '../../../data/earnings';
import IntlMessages from '../../../helpers/IntlMessages';
import Pagination from '../../../containers/common/Pagination';

const EarningsByMaterial = ({ match }) => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchIdRef = React.useRef(0);
  const pageSize = 5;

  const fetchData = React.useCallback(() => {
    console.log('Fetching');
    const fetchId = ++fetchIdRef.current;
    // loadAll();
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * currentPage;
      const endRow = startRow + pageSize;
      setLoading(true);

      setTimeout(() => {
        setEarnings(earnings_by_material);
        setLoading(false);
      }, 1000);
      // apiBooks.getAll({ startRow, pageSize, searchKeyword });
      // apiMaterials
      //   .getAll({
      //     start: startRow,
      //     size: pageSize,
      //     type: 'BOOK',
      //   })
      //   .then((res) => {
      //     if (res.success) {
      //       const newBooks = res.data.materials;
      //       setBooks(newBooks.slice(startRow, endRow));
      //       setPageCount(Math.ceil(res.data.total_materials / pageSize));
      //     }
      //     setLoading(false);
      //   });
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="reporting.earnings_by_materials" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="8">
          <Card className="mb-4">
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>Material Name</th>
                    <th style={{ textAlign: 'right' }}>Earning</th>
                  </tr>
                </thead>
                {loading ? (
                  <div className="loading" />
                ) : (
                  <tbody>
                    {earnings.map(({ id, title, amount }) => (
                      <tr key={id}>
                        <td>{title}</td>
                        <td style={{ textAlign: 'right' }}>ETB {amount}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>

              {totalPage > 1 && !loading && (
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  onChangePage={setCurrentPage}
                />
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(EarningsByMaterial);
