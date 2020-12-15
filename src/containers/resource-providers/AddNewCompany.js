/* eslint-disable no-unused-vars */
import React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
  FormGroup,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Modal,
  ModalFooter,
} from 'reactstrap';
import { FormikDatePicker } from '../../containers/common/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import apiProviders from '../../services/api/provider';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CompanySchema = Yup.object().shape({
  legalName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required("Please enter the company's legal name"),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter the company or admin email address'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Office phone number is required'),
});

const AddNewCompanyModal = ({ modalOpen, toggleModal, handleSubmit }) => {
  const onSubmit = (values, actions) => {
    console.log(values);

    const { legalName, displayName, email, phone } = values;

    const payload = {
      legal_name: legalName,
      display_name: displayName || legalName,
      email: email,
      phone,
      is_company: true,
    };

    apiProviders.post(payload).then((res) => {
      console.log('ache', res);
      if (res.success) {
        handleSubmit(res.data);
      }
      actions.setSubmitting(false);
    });

    console.log('Sending', payload);
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="menu.add-new-company" />
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            legalName: '',
            displayName: '',
            email: '',
            phone: '',
          }}
          validationSchema={CompanySchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup className="error-l-75">
                <Label>Legal Name</Label>
                <Field className="form-control" name="legalName" />
                {errors.legalName && touched.legalName ? (
                  <div className="invalid-feedback d-block">
                    {errors.legalName}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup className="error-l-75">
                <Label>Display Name (optional)</Label>
                <Field className="form-control" name="displayName" />
              </FormGroup>
              <FormGroup>
                <Label>Admin Email</Label>
                <Field className="form-control" name="email" type="email" />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label>Office Phone</Label>
                <Field className="form-control" name="phone" type="tel" />
                {errors.phone && touched.phone ? (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
                ) : null}
              </FormGroup>

              <ModalFooter>
                <Button color="secondary" outline onClick={toggleModal}>
                  <IntlMessages id="pages.cancel" />
                </Button>
                <Button color="primary" type="submit">
                  <IntlMessages id="pages.submit" />
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AddNewCompanyModal;
