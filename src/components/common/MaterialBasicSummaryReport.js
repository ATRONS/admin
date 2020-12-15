import React from 'react';
import IconCardsCarousel from '../../containers/common/IconCardsCarousel';

export const MaterialBasicSummaryReport = ({ reports }) => {
  const {
    downloads,
    total_earnings: totalEarnings,
    total_sells: totalSells,
  } = reports;

  const summaries = [
    {
      title: 'reporting.total_earning',
      icon: 'iconsminds-basket-coins',
      value: 'ETB ' + totalEarnings,
    },
    {
      title: 'reporting.total_sells',
      icon: 'iconsminds-arrow-refresh',
      value: totalSells,
    },
    {
      title: 'reporting.total_downloads',
      icon: 'iconsminds-mail-read',
      value: downloads,
    },
  ];
  return <IconCardsCarousel data={summaries} />;
};
