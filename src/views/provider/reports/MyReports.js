import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { CardTitle, Row, Table } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';
import { summary_earnings } from '../../../data/earnings';
import IntlMessages from '../../../helpers/IntlMessages';
import Pagination from '../../../containers/common/Pagination';
import { CustomSpinner } from '../../../components/common/CustomSpinner';
import { apiReports } from '../../../services/api/provider-related/report';

const MyReports = ({ match }) => {
  const [earningSummary, setEarningsSummary] = useState(null);
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

      // setTimeout(() => {
      //   setEarningsSummary(summary_earnings);
      //   setLoading(false);
      // }, 1000);
      apiReports
        .earningsSummaries({
          startDate: '2018-10-04',
          endDate: '2021-10-11',
        })
        .then((res) => {
          if (res.success) {
            let summaries = res.data;
            let overallSum = 0;
            summaries = summaries.map((daySummary) => {
              const dailyTotal = daySummary.earnings.reduce(
                (tempTotal, curElem) => tempTotal + curElem.earning,
                0
              );
              daySummary.dailyTotal = dailyTotal;
              overallSum += dailyTotal;
              return daySummary;
            });
            summaries = { earnings: summaries, overallSum };
            setEarningsSummary(summaries);
            console.log('fin', summaries);
          }
        })
        .catch((e) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  let mainContent = <CustomSpinner />;
  if (!loading) {
    if (earningSummary !== null) {
      mainContent = (
        <tbody>
          {earningSummary.earnings.map(
            ({ day_label: dayLabel, earnings, dailyTotal }, id) => (
              <React.Fragment key={dayLabel}>
                <tr>
                  <th colSpan={2}> {dayLabel} </th>
                </tr>

                {earnings.map(
                  ({ title, earning, numberOfItemsSold, singlePrice }, i) => (
                    <tr key={`${dayLabel}-${title}-${i}`}>
                      <td style={{ width: '100%' }}>{title}</td>
                      <td className="fit-content-cell text-right">
                        {numberOfItemsSold}
                      </td>
                      <td className="fit-content-cell text-right">
                        ETB {singlePrice}
                      </td>
                      <td className="fit-content-cell text-right">
                        ETB {earning}
                      </td>
                    </tr>
                  )
                )}

                <tr>
                  <th colSpan={4} className="text-right">
                    Total - ETB {dailyTotal}
                  </th>
                </tr>
              </React.Fragment>
            )
          )}

          <tr>
            <th>
              <h2>
                <strong> Overall Total:</strong>
              </h2>
            </th>
            <th colSpan={3} className="text-right">
              <h2>
                <strong>ETB {earningSummary.overallSum}</strong>
              </h2>
            </th>
          </tr>
        </tbody>
      );
    }
  }

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
                {mainContent}
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(MyReports);
