import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import Validation from '../../../containers/add-material/Validation';

const AddMaterialWizard = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.form-wizard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-5">
          <h5 className="mb-4">Validation</h5>
          <Validation />
        </Colxx>
      </Row>
    </>
  );
};
export default AddMaterialWizard;
