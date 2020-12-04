/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { NavItem, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import ApplicationMenu from '../../components/common/ApplicationMenu';
import { getTodoListWithFilter } from '../../redux/actions';

const groupBy = function (xs, key) {
  let curKey;
  return xs.reduce(function (rv, x) {
    curKey = x[key].toLocaleLowerCase();
    rv[curKey] = rv[curKey] + 1 || 1;
    return rv;
  }, {});
};

const ProviderRequestsMenu = ({
  requests,
  filter,
  requestCounts,
  labels,
  categories,
  onFilterChange,
}) => {
  const addFilter = (column, value) => {
    onFilterChange(column, value);
  };

  // const counts = groupBy(requests, 'status');

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <IntlMessages id="request.status" />
          </p>
          <ul className="list-unstyled mb-5">
            <NavItem className={classnames({ active: !filter.status })}>
              <NavLink
                to="#"
                onClick={() => addFilter('status', '')}
                location={{}}
              >
                <i className="simple-icon-reload" />
                <IntlMessages id="request.all_requests" />
                <span className="float-right">{requestCounts.all}</span>
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                active: filter.status === 'pending',
              })}
            >
              <NavLink
                location={{}}
                to="#"
                onClick={() => addFilter('status', 'pending')}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="request.pending_requests" />
                <span className="float-right">
                  {requestCounts.pending || 0}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active: filter && filter.status === 'accepted',
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('status', 'accepted')}
              >
                <i className="simple-icon-check" />
                <IntlMessages id="request.accepted_requests" />
                <span className="float-right">
                  {requestCounts.accepted || 0}
                </span>
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                active: filter.status === 'denied',
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('status', 'denied')}
              >
                <i className="simple-icon-close" />
                <IntlMessages id="request.denied_requests" />
                <span className="float-right">{requestCounts.denied || 0}</span>
              </NavLink>
            </NavItem>
          </ul>
          <p className="text-muted text-small">
            <IntlMessages id="request.category" />
          </p>
          <ul className="list-unstyled mb-5">
            {categories.map((c, index) => {
              return (
                <NavItem key={index}>
                  <div onClick={() => addFilter('category', c.value)}>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        checked={filter && filter.category === c.value}
                        onChange={() => {}}
                      />
                      <label className="custom-control-label">{c.label}</label>
                    </div>
                  </div>
                </NavItem>
              );
            })}
          </ul>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default ProviderRequestsMenu;
