import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BookDetail from './BookDetail';
// import { Books } from './Books';

const Books = React.lazy(() => import('./Books'));
const Magazines = React.lazy(() => import('./magazines'));
const AddMaterialWizard = React.lazy(() => import('./addMaterial'));

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
      <Route
        path={`${match.url}/books`}
        exact
        render={(props) => <Books {...props} />}
      />
      <Route
        path={`${match.url}/books/:id`}
        exact
        render={(props) => <BookDetail {...props} />}
      />

      <Route
        path={`${match.url}/magazines`}
        exact
        render={(props) => <Magazines {...props} />}
      />

      <Route
        path={`${match.url}/add-material`}
        exact
        render={(props) => <AddMaterialWizard {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Pages;
