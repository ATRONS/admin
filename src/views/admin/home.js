import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import BestSellers from '../../containers/dashboard/BestSellers';
import IconCardsCarousel from '../../containers/common/IconCardsCarousel';
import data from '../../data/iconCards';
import { date } from 'yup';
import { apiReports } from '../../services/api/reports';

const Home = ({ intl, match }) => {
  const { messages } = intl;
  const [loading, setloading] = useState(true);
  const [details, setdetails] = useState({});

  useEffect(() => {
    setloading(true);
    apiReports
      .dashboardReports()
      .then((res) => {
        if (res.success) {
          setdetails(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setloading(false);
      });
  }, []);

  let summaryCards = <></>;
  if (!loading && Object.keys(details).length) {
    const countSummaries = [
      {
        title: 'reporting.total_materials',
        icon: 'iconsminds-books',
        value: details.total_materials,
      },
      {
        title: 'reporting.total_providers',
        icon: 'iconsminds-business-mens',
        value: details.total_providers,
      },
      {
        title: 'reporting.total_readers',
        icon: 'iconsminds-male-female',
        value: details.total_readers,
      },
    ];

    const earningSummary = [
      {
        title: 'dashbaord.available_amount',
        icon: 'iconsminds-coins',
        value: details.company_info.balance,
      },
      {
        title: 'reporting.pending_tax',
        icon: 'iconsminds-coins',
        value: details.company_info.pending_tax,
      },
    ];

    summaryCards = (
      <>
        <IconCardsCarousel data={countSummaries} />
        <Row>
          <Colxx md="12" className="mb-4">
            <IconCardsCarousel data={earningSummary} />
          </Colxx>
        </Row>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <div className="loading" />
      ) : (
        <>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="menu.home" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx lg="12" xl="6">
              {summaryCards}
            </Colxx>
            <Colxx lg="12" xl="6" className="mb-4">
              <BestSellers
                title="dashboard.best_sellers"
                data={details.top_selling}
              />
            </Colxx>
          </Row>
        </>
      )}
    </>
  );
};
export default injectIntl(Home);
