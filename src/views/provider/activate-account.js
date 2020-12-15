import React, { useEffect } from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import {
  FormikDatePicker,
  FormikReactSelect,
} from '../../containers/common/FormikFields';
import MaterialDropZone from '../../containers/add-material/MaterialDropZone';
import ImageUploader from '../../containers/common/ImageUploader';
import { connect } from 'react-redux';
import apiProviders from '../../services/api/provider';
import classnames from 'classnames';
import { apiProfile } from '../../services/api/provider-related/profile';
import { providerRoot } from '../../constants/defaultValues';
import { setCurrentUser } from '../../helpers/Utils';
import { loginUserSuccess } from '../../redux/actions';
import urls from '../../services/api/urls';

const mixObjFields = (obj1, obj2) => {};

// import ImageUploader from 'react-images-upload';
const providesData = [
  { label: 'Newspaper', value: 'NEWSPAPER', key: 1 },
  { label: 'Magazine', value: 'MAGAZINE', key: 2 },
];

const ActivateSchema = (isCompany) => {
  return Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your new password'),
    confPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your password again'),

    about: Yup.string().required('Please provide the about'),
    profilePic: Yup.object().nullable().required('Profile picture is required'),
    ...getSpecificValidator(isCompany),
  });
};

const getSpecificValidator = (isCompany) => {
  if (isCompany) {
    return {
      hq_address: Yup.string()
        .min(10, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Please enter your address'),
      provides: Yup.string().required('Please select one of the options'),

      foundOn: Yup.date()
        .nullable()
        .required('Date of establishement required'),
    };
  }

  return {
    dob: Yup.date().nullable().required('Date of birth required'),
    activeFrom: Yup.date().nullable().required('Date required'),
  };
};

const getSpecificInitialState = (isCompany) => {
  if (isCompany) {
    return {
      foundOn: null,
      hq_address: '',
      provides: '',
    };
  }
  return {
    dob: null,
    activeFrom: null,
    provides: 'BOOK',
  };
};

const ActivateAccount = ({ currentUser, history, loginUserSuccess }) => {
  const onSubmit = (values, { setSubmitting }) => {
    console.log('Values', values);
    const {
      password,
      about,
      dob,
      activeFrom,
      profilePic,
      foundOn,
      hq_address,
      provides,
    } = values;

    const payload = {
      password,
      about,
      avatar_url: profilePic.url,
      provides,
    };

    if (isCompany) {
      payload.company_info = {
        hq_address: hq_address,
        founded_date: foundOn.toISOString(),
      };
    } else {
      payload.author_info = {
        dob: dob.toISOString(),
        active_from: activeFrom.toISOString(),
      };
    }

    apiProfile
      .activateAccount(payload)
      .then((res) => {
        if (res.success) {
          //
          const newUserData = { ...currentUser, ...res.data };
          setCurrentUser(newUserData);
          loginUserSuccess(newUserData);
          // console.log('Who', );
          // setImmediate(() => {
          //   history.push(providerRoot);
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(true);
      });
  };
  const { isCompany } = currentUser;
  // const isCompany = true

  useEffect(() => {
    if (currentUser.active) {
      history.push(providerRoot);
    }
  }, [currentUser]);

  return (
    <>
      <Row>
        <Colxx xxs="12" className="mb-5">
          <Row>
            <Colxx xxs="12" xl="8" className="mb-5">
              <h5 className="mb-4">Hello, Henok Dejen!</h5>
              <Card>
                <CardBody>
                  <h6 className="mb-4">
                    Please complete your profile to activate your account
                  </h6>
                  <Formik
                    initialValues={{
                      password: '',
                      confPassword: '',
                      about: '',
                      profilePic: null,
                      ...getSpecificInitialState(isCompany),
                    }}
                    validationSchema={ActivateSchema(isCompany)}
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
                        <FormGroup className="error-l-75">
                          <ImageUploader
                            name="profilePic"
                            onChange={setFieldValue}
                          />

                          {errors.profilePic && touched.profilePic ? (
                            <div className="invalid-feedback d-block">
                              {errors.profilePic}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="error-l-75">
                          <Label>New password</Label>
                          <Field
                            className="form-control"
                            name="password"
                            type="password"
                          />
                          {errors.password && touched.password ? (
                            <div className="invalid-feedback d-block">
                              {errors.password}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="error-l-75">
                          <Label>Confirm password</Label>
                          <Field
                            className="form-control"
                            name="confPassword"
                            type="password"
                          />
                          {errors.confPassword && touched.confPassword ? (
                            <div className="invalid-feedback d-block">
                              {errors.confPassword}
                            </div>
                          ) : null}
                        </FormGroup>

                        {!isCompany ? (
                          <>
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
                          </>
                        ) : (
                          <>
                            <FormGroup className="error-l-75">
                              <Label>Provides</Label>

                              <FormikReactSelect
                                name="provides"
                                value={providesData.find(
                                  (val) => val.value == values.type
                                )}
                                options={providesData}
                                onChange={(name, data) =>
                                  setFieldValue(name, data.value)
                                }
                                onBlur={setFieldTouched}
                              />
                            </FormGroup>

                            <FormGroup className="error-l-75">
                              <Label>Address</Label>
                              <Field
                                className="form-control"
                                name="hq_address"
                              />
                              {errors.hq_address && touched.hq_address ? (
                                <div className="invalid-feedback d-block">
                                  {errors.hq_address}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup className="error-l-100">
                              <Label className="d-block">Established</Label>
                              <FormikDatePicker
                                name="foundOn"
                                value={values.foundOn}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.foundOn && touched.foundOn ? (
                                <div className="invalid-feedback d-block">
                                  {errors.foundOn}
                                </div>
                              ) : null}
                            </FormGroup>
                          </>
                        )}

                        <FormGroup>
                          <Label>About</Label>
                          <Field
                            className="form-control"
                            name="about"
                            component="textarea"
                          />
                          {errors.about && touched.about ? (
                            <div className="invalid-feedback d-block">
                              {errors.about}
                            </div>
                          ) : null}
                        </FormGroup>
                        <Button
                          color="primary"
                          type="submit"
                          className={` mt-3 btn-multiple-state  ${classnames({
                            'show-spinner': isSubmitting,
                          })}`}
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">Activate</span>
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

// export default ActivateAccount

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};
const mapActionsToProps = {
  loginUserSuccess: loginUserSuccess,
};

export default connect(mapStateToProps, mapActionsToProps)(ActivateAccount);
