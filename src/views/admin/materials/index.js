import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompanyMaterials from './CompanyMaterials';
// import MaterialDetails from './MaterialDetails';
// import { Books } from './Books';

const Books = React.lazy(() => import('./Books'));
const Magazines = React.lazy(() => import('./magazines'));
const Newspapers = React.lazy(() => import('./newspapers'));
const AddMaterialWizard = React.lazy(() => import('./addMaterial'));
const MaterialDetails = React.lazy(() =>
  import('../../common/MaterialDetails')
);
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
        render={(props) => (
          <MaterialDetails isAdmin={true} type="book" {...props} />
        )}
      />

      <Route
        path={`${match.url}/magazines`}
        exact
        render={(props) => <CompanyMaterials type="magazine" {...props} />}
      />
      <Route
        path={`${match.url}/newspapers`}
        exact
        render={(props) => <CompanyMaterials type="newspaper" {...props} />}
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
