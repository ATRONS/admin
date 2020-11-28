import React from 'react';
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

const MaterialSalesAreaChart = ({ className = '', controls = true }) => {
  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="reporting.sales_report" />
            </h5>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="reporting.this_week" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="reporting.last_week" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="reporting.this_month" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="reporting.this_year" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow={false} data={areaChartData} />
      </div>
    </Card>
  );
};

export default MaterialSalesAreaChart;
