/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  CustomInput,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import ProviderRequestsMenu from '../../../containers/requests/ProviderRequestsMenu';
import ProviderRequestListItem from '../../../components/applications/ProviderRequestListItem';
import { providerRequests } from '../../../data/requests';
import { NavLink } from 'react-router-dom';

const labels = [
  { label: 'EDUCATION', color: 'secondary' },
  { label: 'NEW FRAMEWORK', color: 'primary' },
  { label: 'PERSONAL', color: 'info' },
];

const categories = ['Flexbox', 'Sass', 'React'];

const requestTypes = [
  {
    lable: 'request.paymnet',
    path: '/provider/payment/disburse',
  },
  {
    lable: 'request.material_removal',
    path: '/provider/payment/disburse',
  },
];

const RequestsListPage = ({ match, intl }) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const [filter, setFilter] = useState({ status: '', category: '' });
  const fetchIdRef = React.useRef(0);

  const fetchRequests = React.useCallback(() => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const newRequests = providerRequests.filter(
          (req) =>
            (req.status === filter.status.toLowerCase() ||
              filter.status === '') &&
            (req.category === filter.category.toLowerCase() ||
              filter.category === '')
        );
        setRequests(newRequests);
        setLoading(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    console.log('pp', filter);
    fetchRequests();
  }, [filter]);

  useEffect(() => {
    document.body.classList.add('right-menu');
    return () => {
      document.body.classList.remove('right-menu');
    };
  }, []);

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.todo" />
            </h1>
            {loading && (
              <div className="text-zero top-right-button-container">
                <ButtonDropdown
                  isOpen={dropdownSplitOpen}
                  toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
                >
                  <div className="btn btn-primary btn-lg pl-4 pr-0 top-right-button">
                    <IntlMessages id="pages.add-new" />
                  </div>
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split btn-lg"
                  />
                  <DropdownMenu right>
                    {requestTypes.map((rt) => (
                      <DropdownItem>
                        <NavLink to={rt.path}>
                          <IntlMessages id={rt.lable} />
                        </NavLink>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            )}
            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="todo.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
          </div>
          <Separator className="mb-5" />
          <Row>
            {!loading ? (
              requests.map((item, index) => (
                <ProviderRequestListItem
                  key={`todo_item_${index}`}
                  item={item}
                />
              ))
            ) : (
              <div className="loading" />
            )}
          </Row>
        </Colxx>
      </Row>
      <ProviderRequestsMenu
        categories={categories}
        labels={labels}
        requests={requests}
        loaded={!loading}
        filter={filter}
        onFilterChange={(column, value) =>
          setFilter({ ...filter, [column]: value.toLowerCase() })
        }
      />
    </>
  );
};

export default injectIntl(RequestsListPage);
