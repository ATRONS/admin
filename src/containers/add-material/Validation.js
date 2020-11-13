/* eslint-disable no-param-reassign */
import React, { createRef, useState } from 'react';
import {
  Card,
  CardBody,
  CustomInput,
  FormGroup,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from '../../helpers/IntlMessages';
import BottomNavigation from '../../components/wizard/BottomNavigation';
import TopNavigation from '../../components/wizard/TopNavigation';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';
import Select from 'react-select';
import MaterialDropZone from './MaterialDropZone';
import DatePicker from 'react-datepicker';
import { FormikReactSelect } from '../resource-providers/FormikFields';
import MaterialBasicForm from './MaterialBasicForm';
import MaterialDetailedForm from './MaterialDetailedForm';

const selectData = [
  { label: 'Book', value: 'cake', key: 0 },
  { label: 'Newspaper', value: 'cupcake', key: 1 },
  { label: 'Magazine', value: 'dessert', key: 2 },
];

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validateName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your name';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 6) {
    error = 'Password must be longer than 6 characters';
  }
  return error;
};

const Validation = ({ intl }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'name',
      value: '',
    },
    {
      valid: false,
      name: 'email',
      value: '',
    },
    {
      valid: false,
      name: 'password',
      value: '',
    },
  ]);
  const [selectedOption, setSelectedOption] = useState('');

  // step 2 related
  const [startDate, setStartDate] = useState(new Date());

  const asyncLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    const { name } = fields[formIndex];

    form.submitForm().then(() => {
      const newFields = [...fields];

      newFields[formIndex].value = form.values[name];
      newFields[formIndex].valid = !form.errors[name];
      setFields(newFields);

      console.log('henok', form.values);

      if (formIndex == 0) {
        goToNext();
        step.isDone = true;
        if (steps.length - 2 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
          asyncLoading();
        }
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;
  return (
    <Row>
      <Colxx xxs="12" xl="6" className="mb-5">
        <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation className="justify-content-center" disableNav />
              <Steps>
                <Step
                  id="step1"
                  name={messages['wizard.am-step-name-1']}
                  desc={messages['wizard.am-step-desc-1']}
                >
                  <MaterialBasicForm innerRef={forms[0]} />
                </Step>
                <Step
                  id="step2"
                  name={messages['wizard.am-step-name-2']}
                  desc={messages['wizard.am-step-desc-2']}
                >
                  <MaterialDetailedForm innerRef={forms[1]} />
                </Step>
                <Step
                  id="step3"
                  name={messages['wizard.am-step-name-3']}
                  desc={messages['wizard.am-step-desc-3']}
                >
                  <div className="wizard-basic-step">
                    <Formik
                      innerRef={forms[2]}
                      initialValues={{
                        password: fields[2].value,
                      }}
                      onSubmit={() => {}}
                    >
                      {({ errors, touched }) => (
                        <Form className="av-tooltip tooltip-label-right error-l-75">
                          <FormGroup>
                            <CustomInput
                              type="checkbox"
                              id="exCustomCheckbox"
                              label="It is free"
                            />
                          </FormGroup>
                          <>
                            <FormGroup>
                              <Label>{messages['forms.selling-price']}</Label>
                              <Field
                                className="form-control"
                                name="selling-price"
                                type="number"
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              )}
                            </FormGroup>

                            <FormGroup>
                              <Label>{messages['forms.selling-price']}</Label>
                              <Field
                                className="form-control"
                                name="selling-price"
                                type="number"
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              )}
                            </FormGroup>
                          </>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Step>
                <Step id="step4" hideTopNav>
                  <div className="wizard-basic-step text-center pt-3">
                    {loading ? (
                      <div>
                        <Spinner color="primary" className="mb-1" />
                        <p>
                          <IntlMessages id="wizard.async" />
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h2 className="mb-2">
                          <IntlMessages id="wizard.content-thanks" />
                        </h2>
                        <p>
                          <IntlMessages id="wizard.registered" />
                        </p>
                      </div>
                    )}
                  </div>
                </Step>
              </Steps>
              <BottomNavigation
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                className={`justify-content-center mt-5 ${
                  bottomNavHidden && 'invisible'
                }`}
                prevLabel={messages['wizard.prev']}
                nextLabel={messages['wizard.next']}
              />
            </Wizard>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default injectIntl(Validation);
