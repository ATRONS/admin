import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProviderLayout from '../../layout/ProviderLayout';
import InActiveAccountLayout from '../../layout/InActiveAccountLayout';
import { providerRoot } from '../../constants/defaultValues';
const Materials = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './materials')
);

const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);

const GetPaid = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './payments/GetPaid')
);

const Requests = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './requests')
);

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './home')
);

const ActivateAccount = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './activate-account')
);

const AccountRelated = ({ match }) => {
  return (
    <InActiveAccountLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route
            path={`${match.url}/activate`}
            render={(props) => <ActivateAccount {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </InActiveAccountLayout>
  );
};

const DashboardRelated = ({ match, currentUser }) => {
  if (currentUser.active) {
    return (
      <ProviderLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/materials`}
              />
              <Route
                path={`${match.url}/`}
                exact
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/materials`}
                render={(props) => <Materials {...props} />}
              />

              <Route
                path={`${match.url}/reports`}
                render={(props) => <Reports {...props} />}
              />

              <Route
                path={`${match.url}/requests`}
                render={(props) => <Requests {...props} />}
              />

              <Route
                path={`${match.url}/payment/disburse`}
                render={(props) => <GetPaid {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </ProviderLayout>
    );
  } else {
    return (
      <Redirect
        from={match.url}
        exact
        to={`${providerRoot}/account/activate`}
      />
    );
  }
};

const App = ({ match, currentUser }) => {
  return (
    <div>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route
            path={`${match.url}/account`}
            render={(props) => <AccountRelated {...props} />}
          />

          <Route
            path={`${match.url}/`}
            render={(props) => (
              <DashboardRelated currentUser={currentUser} {...props} />
            )}
          />
        </Switch>
      </Suspense>
    </div>
  );
};

const mapStateToProps = ({ menu, authUser }) => {
  const { containerClassnames } = menu;
  const { currentUser } = authUser;
  return { containerClassnames, currentUser };
};

export default withRouter(connect(mapStateToProps, {})(App));
