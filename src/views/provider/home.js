import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
// import RecentOrders from '../../containers/dashboards/RecentOrders';
// import SalesChartCard from '../../containers/dashboards/SalesChartCard';
import IconCardsCarousel from '../../containers/common/IconCardsCarousel';
import SalesChartCard from '../../containers/common/SalesChartCard';

const Dashboard = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.default" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx lg="12" xl="6">
          {/* <IconCardsCarousel /> */}
          <Row>
            <Colxx md="12" className="mb-4">
              {/* <SalesChartCard /> */}
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          {/* <RecentOrders /> */}
        </Colxx>
      </Row>
    </>
  );
};

export default Dashboard;
