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
  Dropdown,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';

import ProviderRequestsMenu from '../../containers/requests/ProviderRequestsMenu';
import ProviderRequestListItem from '../../components/applications/ProviderRequestListItem';
import { providerRequests } from '../../data/requests';
import { NavLink } from 'react-router-dom';
import apiRequests from '../../services/api/provider-related/requests';
import { apiProvider } from '../../services/api/main';
import apiProviders from '../../services/api/provider';
import { AdminRequestListItem } from '../../components/applications/AdminRequestListItem';

const labels = [
  { label: 'EDUCATION', color: 'secondary' },
  { label: 'NEW FRAMEWORK', color: 'primary' },
  { label: 'PERSONAL', color: 'info' },
];

const categories = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Withdrawal',
    value: 'withdrawal',
    color: 'secondary',
  },
  {
    label: 'Delete Material',
    value: 'delete_material',
    color: 'primary',
  },
  {
    label: 'Deactivate Account',
    value: 'deactivate_material',
    color: 'primary',
  },
];

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
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [requests, setRequests] = useState([]);

  const [requestCounts, setRequestCounts] = useState({});

  const [filter, setFilter] = useState({ status: '', category: '' });
  const fetchIdRef = React.useRef(0);

  const fetchRequests = () => {
    const fetchId = ++fetchIdRef.current;
    console.log('pp', filter);

    setLoading(true);
    apiProviders
      .getRequests(filter)
      .then((res) => {
        if (res.success) {
          if (fetchId === fetchIdRef.current) {
            const newRequests = res.data.requests;
            console.log('ss', newRequests);
            setRequests(newRequests);

            if (!initialDataLoaded) {
              setInitialDataLoaded(true);
              setRequestCounts({
                all: 4,
                pending: 2,
                denied: 1,
                accepted: 1,
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log('Fetching requests error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const acceptRequest = (id) => {
    const newRequests = requests.map((rqst) => {
      if (rqst._id == id) {
        rqst.processing = true;
      }
      return rqst;
    });

    setRequests(newRequests);
    apiProviders
      .updateRequest(id, { status: 'accepted' })
      .then((res) => {
        if (res.success) {
          const updatedRequest = res.data;
          updatedRequest.processing = false;
          const updatedRequests = requests.map((rqst) => {
            if (rqst._id == updatedRequest._id) {
              return updatedRequest;
            }
            return rqst;
          });

          console.log('maggie', updatedRequests);
          setRequests(updatedRequests);
        }
      })
      .catch((error) => {
        console.log('Fetching requests error', error);
        const newRequests = requests.map((rqst) => {
          if (rqst._id == id) {
            rqst.processing = false;
          }
          return rqst;
        });
        setRequests(newRequests);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  useEffect(() => {
    document.body.classList.add('right-menu');
    return () => {
      document.body.classList.remove('right-menu');
    };
  }, []);

  console.log('lash', requests);

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.todo" />
            </h1>

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
              requests.length ? (
                requests.map((item, index) => (
                  <AdminRequestListItem
                    key={`todo_item_${index}`}
                    item={item}
                    acceptRequest={acceptRequest}
                  />
                ))
              ) : (
                <h4>There are no requests</h4>
              )
            ) : (
              <div className="loading" />
            )}
          </Row>
        </Colxx>
      </Row>
      {initialDataLoaded && (
        <ProviderRequestsMenu
          categories={categories}
          labels={labels}
          requests={requests}
          requestCounts={requestCounts}
          loaded={!loading}
          filter={filter}
          onFilterChange={(column, value) =>
            setFilter({ ...filter, [column]: value.toLowerCase() })
          }
        />
      )}
    </>
  );
};

export default injectIntl(RequestsListPage);
