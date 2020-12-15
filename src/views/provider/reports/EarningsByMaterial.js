import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { useEffect, useState } from 'react';
import { CardTitle, Row, Table } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';
import { earnings_by_material } from '../../../data/earnings';
import IntlMessages from '../../../helpers/IntlMessages';
import Pagination from '../../../containers/common/Pagination';
import { CustomSpinner } from '../../../components/common/CustomSpinner';
import { apiReports } from '../../../services/api/provider-related/report';
import { formatMoney } from '../../../helpers/sales';

const EarningsByMaterial = ({ match }) => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(0);
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
      //   setEarnings(earnings_by_material);
      // }, 1000);
      apiReports
        .earningByMaterials()
        .then((res) => {
          if (res.success) {
            console.log('fina', res.data);

            // const { materials, total_materials } = res.data;
            // setTotalPage(Math.ceil(total_materials / pageSize));
            setEarnings(res.data.materials || []);
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
    if (earnings !== null) {
      console.log('wary', earnings);
      mainContent = earnings.length ? (
        <tbody>
          {earnings.map(
            ({ _id: id, count, title, total_earning: totalEarning }) => (
              <tr key={id}>
                <td>{title}</td>
                <td className="fit-content-cell text-right">
                  {count ? count : 0}
                </td>
                <td className="fit-content-cell text-right">
                  {formatMoney(totalEarning ? totalEarning : 0)}
                </td>
              </tr>
            )
          )}
        </tbody>
      ) : (
        <h4 className="mt-3">There are no earnings</h4>
      );
    }
  }

  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="reporting.earnings_by_materials" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx lg="8" xss="12">
          <Card className="mb-4">
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>Material Name</th>
                    <th className="fit-content-cell text-right">
                      Number of items
                    </th>
                    <th className="fit-content-cell text-right">Earning</th>
                  </tr>
                </thead>
                {mainContent}
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
