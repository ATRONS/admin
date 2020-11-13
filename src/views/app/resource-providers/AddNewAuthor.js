/* eslint-disable no-unused-vars */
import React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { FormikDatePicker } from '../../../containers/resource-providers/FormikFields';

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
  details: Yup.string().required('Please provide the details'),
  dob: Yup.date().nullable().required('Date of birth required'),
  activeFrom: Yup.date().nullable().required('Date required'),
});

const AddNewAuthor = ({ match }) => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.add-new-author" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx sm="12" lg={8}>
          <Card>
            <CardBody>
              <h6 className="mb-4">Personal Information</h6>

              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  displayName: '',
                  email: '',
                  details: '',
                  dob: null,
                  activeFrom: null,
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
              >
                {({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <Form className="av-tooltip tooltip-label-right">
                    <FormGroup row>
                      <Colxx sm={6}>
                        <FormGroup className="error-l-75">
                          <Label>First Name</Label>
                          <Field className="form-control" name="firstName" />
                          {errors.firstName && touched.firstName ? (
                            <div className="invalid-feedback d-block">
                              {errors.firstName}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={6}>
                        <FormGroup className="error-l-75">
                          <Label>Last Name</Label>
                          <Field className="form-control" name="lastName" />
                          {errors.lastName && touched.lastName ? (
                            <div className="invalid-feedback d-block">
                              {errors.lastName}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={6}>
                        <FormGroup className="error-l-75">
                          <Label>Display Name (optional)</Label>
                          <Field className="form-control" name="displayName" />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={6}>
                        <FormGroup>
                          <Label>Email</Label>
                          <Field
                            className="form-control"
                            name="email"
                            type="email"
                          />
                          {errors.email && touched.email ? (
                            <div className="invalid-feedback d-block">
                              {errors.email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={6}>
                        <FormGroup className="error-l-100">
                          <Label className="d-block">Date of birth</Label>
                          <FormikDatePicker
                            name="dob"
                            value={values.dob}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.dob && touched.dob ? (
                            <div className="invalid-feedback d-block">
                              {errors.dob}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>

                      <Colxx sm={6}>
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
                      </Colxx>
                    </FormGroup>

                    <FormGroup>
                      <Label>About the author</Label>
                      <Field
                        className="form-control"
                        name="details"
                        component="textarea"
                      />
                      {errors.details && touched.details ? (
                        <div className="invalid-feedback d-block">
                          {errors.details}
                        </div>
                      ) : null}
                    </FormGroup>

                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default AddNewAuthor;
