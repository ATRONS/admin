import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddNewAuthor from './AddNewAuthor';
// import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Authors = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './AuthorsListPage')
);

const Companies = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './CompaniesListPage')
);

const ProviderProfile = React.lazy(() =>
  import(/* webpackChunkName: "pages-profile" */ './ProviderProfile')
);

const ResourceProviders = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/authors`} />
      <Route
        path={`${match.url}/authors`}
        exact
        render={(props) => <Authors {...props} />}
      />

      <Route
        path={`${match.url}/authors/:id`}
        exact
        render={(props) => <ProviderProfile type="author" {...props} />}
      />

      <Route
        path={`${match.url}/companies`}
        exact
        render={(props) => <Companies {...props} />}
      />

      <Route
        path={`${match.url}/companies/:id`}
        exact
        render={(props) => <ProviderProfile type="company" {...props} />}
      />

      <Route
        path={`${match.url}/add-new-author`}
        render={(props) => <AddNewAuthor {...props} />}
      />
      {/* 
      <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/content`}
        component={ContentDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/ecommerce`}
        component={EcommerceDefault}
        roles={[UserRole.Editor]}
      />
      <ProtectedRoute
        path={`${match.url}/analytics`}
        component={AnalyticsDefault}
        roles={[UserRole.Editor]}
      />
      */}

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ResourceProviders;
