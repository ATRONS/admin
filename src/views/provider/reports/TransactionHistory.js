import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { CardTitle, Row, Table } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';
import { transactions_data } from '../../../data/earnings';
import IntlMessages from '../../../helpers/IntlMessages';
import Pagination from '../../../containers/common/Pagination';
import { NavLink } from 'react-router-dom';
import { ref } from 'yup';

const TransactionHistory = ({ match }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(3);
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
        setTransactions(transactions_data);
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
          <Breadcrumb heading="reporting.transaction_history" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="9">
          <Card className="mb-4">
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Describtion</th>
                    <th>Amount</th>
                    <th>Ref Id</th>
                  </tr>
                </thead>
                {loading ? (
                  <div className="loading" />
                ) : (
                  <tbody>
                    {transactions.map(
                      ({ date, type, describtion, amount, refId }, id) => (
                        <tr key={id}>
                          <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                            {date.toLocaleDateString()}
                          </td>
                          <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                            {type}
                          </td>
                          <td>{describtion}</td>
                          <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                            {amount}
                          </td>
                          <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                            <NavLink to={`/somewhere/${refId}`}>
                              {refId}
                            </NavLink>
                          </td>
                        </tr>
                      )
                    )}
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

export default injectIntl(TransactionHistory);
