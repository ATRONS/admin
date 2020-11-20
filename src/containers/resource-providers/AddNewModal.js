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
  about: Yup.string()
    .min(10, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Please enter your last name'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  dob: Yup.date().nullable().required('Date of birth required'),
  activeFrom: Yup.date().nullable().required('Date required'),
});

const AddNewAuthor = ({ modalOpen, toggleModal, handleSubmit }) => {
  const onSubmit = (values, actions) => {
    console.log(values);

    const {
      firstName,
      lastName,
      displayName,
      email,
      dob,
      activeFrom,
      phone,
      about,
    } = values;

    const payload = {
      legal_name: `${firstName} ${lastName}`,
      display_name: displayName,
      email: email,
      phone,
      about,
      is_company: false,
      author_info: {
        dob: dob.toISOString(),
        active_from: activeFrom.toISOString(),
      },
      password: 'Dummy',
      provides: 'BOOK',
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
        <IntlMessages id="author.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            firstName: 'Henok',
            lastName: 'Dejen',
            displayName: 'Mukera',
            email: 'henokdejen84@gmail.com',
            dob: new Date(),
            phone: '0911932901',
            about:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur diam ligula, ornare et mi sit amet, lacinia aliquam metus. Suspendisse ornare velit et velit imperdiet vehicula. Sed accumsan congue consectetur. Pellentesque dictum molestie eros, sed egestas nisl feugiat in. Proin fermentum, dolor id rutrum sollicitudin,',
            activeFrom: new Date(),
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
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

              <FormGroup>
                <Label>Phone</Label>
                <Field className="form-control" name="phone" type="tel" />
                {errors.phone && touched.phone ? (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
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

              <FormGroup>
                <Label>About the author</Label>
                <Field
                  className="form-control"
                  name="about"
                  component="textarea"
                />
                {errors.about && touched.about ? (
                  <div className="invalid-feedback d-block">{errors.about}</div>
                ) : null}
              </FormGroup>

              <ModalFooter>
                <Button color="secondary" outline onClick={toggleModal}>
                  <IntlMessages id="pages.cancel" />
                </Button>

                <Button
                  color="primary"
                  type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    isSubmitting ? 'show-spinner' : ''
                  }`}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="pages.submit" />
                  </span>
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
