import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IconCardsCarousel from '../common/IconCardsCarousel';
import SalesChartCard from '../common/SalesChartCard';

const ProviderReporting = () => {
  return (
    <>
      <IconCardsCarousel />
      <Row>
        <Colxx md="12" className="mb-4">
          <SalesChartCard />
        </Colxx>
      </Row>
    </>
  );
};

export default ProviderReporting;
