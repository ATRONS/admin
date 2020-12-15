import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import { extractSellsData, formatMoney } from '../../helpers/sales';
import IconCardsCarousel from '../common/IconCardsCarousel';
import SalesChartCard from '../common/SalesChartCard';

const parseSummaryReports = (data) => {
  return [
    {
      title: 'dashbaord.available_amount',
      icon: 'iconsminds-basket-coins',
      value: formatMoney(data.available_balance),
    },
    {
      title: 'dashbaord.total_amount',
      icon: 'iconsminds-arrow-refresh',
      value: formatMoney(data.total_earnings),
    },
    {
      title: 'dashbaord.total_books',
      icon: 'iconsminds-mail-read',
      value: data.total_materials,
    },
  ];
};

const ProviderReporting = ({ summary, sells_report }) => {
  return (
    <>
      <IconCardsCarousel data={parseSummaryReports(summary)} />
      <Row>
        <Colxx md="12" className="mb-4">
          <SalesChartCard data={extractSellsData(sells_report)} />
        </Colxx>
      </Row>
    </>
  );
};

export default ProviderReporting;
