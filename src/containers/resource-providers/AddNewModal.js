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
import { FormikDatePicker } from '../../containers/resource-providers/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  dob: Yup.date().nullable().required('Date of birth required'),
  activeFrom: Yup.date().nullable().required('Date required'),
});

const AddNewAuthor = ({ modalOpen, toggleModal, handleSubmit }) => {
  const onSubmit = (values) => {
    console.log(values);

    const { firstName, lastName, displayName, email, dob, activeFrom } = values;

    const payload = {
      legal_name: `${firstName} ${lastName}`,
      display_name: displayName,
      email: email,
      is_company: false,
      author_info: {
        dob: dob,
        active_from: activeFrom,
      },
      provides: 'BOOK',
    };

    console.log('Sending', payload);
    handleSubmit(payload);
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="author.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            dob: null,
            activeFrom: null,
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup className="error-l-75">
                <Label>First Name</Label>
                <Field className="form-control" name="firstName" />
                {errors.firstName && touched.firstName ? (
                  <div className="invalid-feedback d-block">
                    {errors.firstName}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-75">
                <Label>Last Name</Label>
                <Field className="form-control" name="lastName" />
                {errors.lastName && touched.lastName ? (
                  <div className="invalid-feedback d-block">
                    {errors.lastName}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup className="error-l-75">
                <Label>Display Name (optional)</Label>
                <Field className="form-control" name="displayName" />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Field className="form-control" name="email" type="email" />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                ) : null}
              </FormGroup>

              <FormGroup className="error-l-100">
                <Label className="d-block">Date of birth</Label>
                <FormikDatePicker
                  name="dob"
                  value={values.dob}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.dob && touched.dob ? (
                  <div className="invalid-feedback d-block">{errors.dob}</div>
                ) : null}
              </FormGroup>

              <FormGroup className="error-l-100">
                <Label className="d-block">Active From</Label>
                <FormikDatePicker
                  name="activeFrom"
                  value={values.activeFrom}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.activeFrom && touched.activeFrom ? (
                  <div className="invalid-feedback d-block">
                    {errors.activeFrom}
                  </div>
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

export default AddNewAuthor;
