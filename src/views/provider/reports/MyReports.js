import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { CardTitle, Row, Table } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';
import { summary_earnings } from '../../../data/earnings';
import IntlMessages from '../../../helpers/IntlMessages';
import Pagination from '../../../containers/common/Pagination';

const MyReports = ({ match }) => {
  const [earningSummary, setEarningsSummary] = useState([]);
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
        setEarningsSummary(summary_earnings);
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
          <Breadcrumb heading="reporting.my_reports" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="12" lg="8">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <h2>
                  <IntlMessages id="reporting.summary_reports" />
                </h2>
              </CardTitle>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th className="fit-content-cell text-right">
                      Number of items
                    </th>
                    <th className="fit-content-cell text-right">
                      Single Item Price
                    </th>
                    <th className="fit-content-cell text-right">Amount</th>
                  </tr>
                </thead>
                {loading ? (
                  <div className="loading" />
                ) : (
                  <tbody>
                    {earningSummary.map(
                      ({ date, earnings, totalAmount }, id) => (
                        <>
                          <tr>
                            <th colSpan={2}> {date} </th>
                          </tr>

                          {earnings.map(
                            ({ title, amount, itemsCount, singlePrice }) => (
                              <tr>
                                <td style={{ width: '100%' }}>{title}</td>
                                <td className="fit-content-cell text-right">
                                  {itemsCount}
                                </td>
                                <td className="fit-content-cell text-right">
                                  {singlePrice}
                                </td>
                                <td className="fit-content-cell text-right">
                                  {amount}
                                </td>
                              </tr>
                            )
                          )}

                          <tr>
                            <th colSpan={4} className="text-right">
                              Total - {totalAmount}{' '}
                            </th>
                          </tr>
                        </>
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

export default injectIntl(MyReports);
