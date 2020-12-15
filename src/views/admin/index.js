import React, { Suspense, useEffect, useState } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AdminLayout';
import { AddNewAuthor } from './resource-providers/AddNewAuthor';
import { UserRole } from '../../helpers/authHelper';
import { loadInitialData } from '../../redux/actions';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Home = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './home')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const RequestsListPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './RequestsListPage')
);

const ResourceProviders = React.lazy(() => import('./resource-providers'));
const Materials = React.lazy(() => import('./materials'));

const App = ({ match, loadInitialData, authUser }) => {
  const [initialDataLoaded, setinitialDataLoaded] = useState(false);

  useEffect(() => {
    loadInitialData(UserRole.Admin);
  }, []);

  return (
    <>
      {!authUser.currentUser.initialDataLoading && (
        <AppLayout>
          <div className="dashboard-wrapper">
            <Suspense fallback={<div className="loading" />}>
              <Switch>
                <Redirect
                  exact
                  from={`${match.url}/`}
                  to={`${match.url}/home`}
                />
                <Route
                  path={`${match.url}/home`}
                  render={(props) => <Home {...props} />}
                />
                <Route
                  path={`${match.url}/second-menu`}
                  render={(props) => <SecondMenu {...props} />}
                />

                <Route
                  path={`${match.url}/resource-providers`}
                  render={(props) => <ResourceProviders {...props} />}
                />

                <Route
                  path={`${match.url}/materials`}
                  render={(props) => <Materials {...props} />}
                />

                <Route
                  path={`${match.url}/requests`}
                  render={(props) => <RequestsListPage {...props} />}
                />

                {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
                <Route
                  path={`${match.url}/blank-page`}
                  render={(props) => <BlankPage {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Suspense>
          </div>
        </AppLayout>
      )}
    </>
  );
};

const mapStateToProps = ({ menu, authUser }) => {
  const { containerClassnames } = menu;
  return { containerClassnames, authUser };
};

export default withRouter(
  connect(mapStateToProps, {
    loadInitialData: loadInitialData,
  })(App)
);
