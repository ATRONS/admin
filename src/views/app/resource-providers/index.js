import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddNewAuthor from './AddNewAuthor';
// import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Author = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './author')
);
const Company = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './company')
);
const ResourceProviders = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/authors`} />
      <Route
        path={`${match.url}/authors`}
        render={(props) => <Author {...props} />}
      />
      <Route
        path={`${match.url}/companies`}
        render={(props) => <Company {...props} />}
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
