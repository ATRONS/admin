import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IconCardsCarousel from '../common/IconCardsCarousel';
import SalesChartCard from '../common/SalesChartCard';

const extractSellsData = (data) => {
  const labels = Array(data.length);
  const values = Array(data.length);

  let currentRow;
  for (let i = 0; i < data.length; i++) {
    currentRow = data[i];
    labels[i] = `${currentRow._id.day} - ${currentRow._id.month}`;
    values[i] = currentRow.total_amount;
  }
  console.log(values);
  return { labels, values };
};

const parseSummaryReports = (data) => {
  return [
    {
      title: 'dashbaord.available_amount',
      icon: 'iconsminds-basket-coins',
      value: 'ETB ' + data.available_balance,
    },
    {
      title: 'dashbaord.total_amount',
      icon: 'iconsminds-arrow-refresh',
      value: 'ETB 74' + data.total_sells_amount,
    },
    {
      title: 'dashbaord.total_books',
      icon: 'iconsminds-mail-read',
      value: 'ETB ' + data.total_materials_count,
    },
  ];
};

const ProviderReporting = ({ data }) => {
  return (
    <>
      <IconCardsCarousel data={parseSummaryReports(data.summary)} />
      <Row>
        <Colxx md="12" className="mb-4">
          <SalesChartCard data={extractSellsData(data.sells_report)} />
        </Colxx>
      </Row>
    </>
  );
};

export default ProviderReporting;
