import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from '../../helpers/IntlMessages';
import { AreaChart } from '../../components/charts';

import { areaChartData } from '../../data/charts';
import { extractSellsData } from '../../helpers/sales';
import { date } from 'yup';
import { ThemeColors } from '../../helpers/ThemeColors';
const colors = ThemeColors();

const dataSet = (data) => ({
  labels: data.labels,
  datasets: [
    {
      label: '',
      data: data.values,
      borderColor: colors.themeColor1,
      pointBackgroundColor: colors.foregroundColor,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.foregroundColor,
      pointRadius: 4,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      fill: true,
      borderWidth: 2,
      backgroundColor: colors.themeColor1_10,
    },
  ],
});

const filteringOptions = [
  {
    key: 'reporting.last_7_days',
    value: 7,
  },
  {
    key: 'reporting.last_30_days',
    value: 30,
  },
];

const MaterialSalesAreaChart = ({
  className = '',
  controls = true,
  fetchData,
}) => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [xdays, setXdays] = useState(filteringOptions[0].key);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const days = filteringOptions.find((fo) => fo.key === xdays);
      const data = await fetchData(days.value);

      console.log(extractSellsData(data));
      setReport(dataSet(extractSellsData(data)));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [xdays]);

  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="reporting.sales_report" /> -{' '}
              <IntlMessages id={xdays} />
            </h5>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id={xdays} />
              </DropdownToggle>
              <DropdownMenu right>
                {filteringOptions.map((filterOp, i) => (
                  <DropdownItem
                    onClick={() => {
                      setXdays(filterOp.key);
                    }}
                  >
                    <IntlMessages
                      id={filterOp.key}
                      key={i}
                      onClick={() => {
                        alert('fine');
                      }}
                    />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </CardBody>

      <div className="chart card-body pt-0">
        {!loading && Object.keys(report).length && <AreaChart data={report} />}
      </div>
    </Card>
  );
};

export default MaterialSalesAreaChart;
