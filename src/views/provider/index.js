import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProviderLayout from '../../layout/ProviderLayout';
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

const App = ({ match }) => {
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
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
