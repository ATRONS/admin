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
import { CustomSpinner } from '../../../components/common/CustomSpinner';
import { apiReports } from '../../../services/api/provider-related/report';
import { formatMoney } from '../../../helpers/sales';

const TransactionHistory = ({ match }) => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchIdRef = React.useRef(0);
  const pageSize = 5;
  const [balance, setBalance] = useState(0);

  const fetchData = React.useCallback(() => {
    console.log('Fetching');
    const fetchId = ++fetchIdRef.current;
    // loadAll();
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * currentPage;
      const endRow = startRow + pageSize;
      setLoading(true);
      apiReports
        .transactions()
        .then((res) => {
          if (res.success) {
            setTransactions(res.data.transactions);
            setBalance(res.data.balance);
          }
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
      // setTimeout(() => {
      setTransactions(transactions_data);
      setTotalPage(20 / pageSize);
      // }, 1000);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  let mainContent = <CustomSpinner />;
  let balanceContent = null;
  if (!loading) {
    if (transactions !== null) {
      balanceContent = (
        <h3 className="mb-3 ml-2">
          Balance: <span className="text-primary">{formatMoney(balance)}</span>
        </h3>
      );
      mainContent = (
        <tbody>
          {transactions.map(
            (
              {
                created_at,
                kind,
                description,
                amount,
                currency,
                tracenumber,
                _id: refId,
              },
              id
            ) => (
              <tr key={id}>
                <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                  {created_at.split('T')[0]}
                </td>
                <td style={{ width: '1%', whiteSpace: 'nowrap' }}>{kind}</td>
                <td>{description}</td>
                <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                  {formatMoney(amount)}
                </td>
                <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                  <NavLink to={`/somewhere/${refId}`} className="text-primary">
                    {tracenumber || refId}
                  </NavLink>
                </td>
              </tr>
            )
          )}
        </tbody>
      );
    }
  }

  console.log('fine', match);

  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="reporting.transaction_history" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="11">
          {balanceContent}
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
                {mainContent}
              </Table>

              {/* {totalPage > 1 && !loading && (
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  onChangePage={setCurrentPage}
                />
              )} */}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(TransactionHistory);
