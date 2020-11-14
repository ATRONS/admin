import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { createRef, useState } from 'react';
import { Card, CardBody, Row, Spinner } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../helpers/IntlMessages';
import BottomNavigation from '../../../components/wizard/BottomNavigation';
import TopNavigation from '../../../components/wizard/TopNavigation';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import MaterialBasicForm from '../../../containers/add-material/MaterialBasicForm';
import MaterialDetailedForm from '../../../containers/add-material/MaterialDetailedForm';
import MaterialPricingForm from '../../../containers/add-material/MaterialPricingForm';

const AddMaterialWizard = ({ match, intl }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [] = useState('');

  // step 2 related
  const [] = useState(new Date());
  const [nextHandler, setNextHandler] = useState(null);

  const asyncLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const submitMaterialData = (data) => {
    console.log('Final data', data);
    asyncLoading();
  };

  const onStepFormSubmitted = (values) => {
    const { goToNext, steps, step } = nextHandler;
    const stepIndex = steps.indexOf(step);
    goToNext();
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      let newValues = { ...fields[0], ...fields[1], ...values };
      setBottomNavHidden(true);
      submitMaterialData(newValues);
    }
    const newFields = [...fields];
    newFields[stepIndex] = values;
    setFields(newFields);
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    setNextHandler({ goToNext, steps, step });
    form.submitForm(goToNext);
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.add-material" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-5">
          <Row>
            <Colxx xxs="12" xl="6" className="mb-5">
              <Card>
                <CardBody className="wizard wizard-default">
                  <Wizard>
                    <TopNavigation
                      className="justify-content-center"
                      disableNav
                    />
                    <Steps>
                      <Step
                        id="step1"
                        name={messages['wizard.am-step-name-1']}
                        desc={messages['wizard.am-step-desc-1']}
                      >
                        <MaterialBasicForm
                          innerRef={forms[0]}
                          onFormSubmitted={onStepFormSubmitted}
                          initialValues={fields[0] || {}}
                        />
                      </Step>
                      <Step
                        id="step2"
                        name={messages['wizard.am-step-name-2']}
                        desc={messages['wizard.am-step-desc-2']}
                      >
                        <MaterialDetailedForm
                          innerRef={forms[1]}
                          onFormSubmitted={onStepFormSubmitted}
                          initialValues={fields[1] || {}}
                          materialType={fields[0] ? fields[0].type.value : ''}
                        />
                      </Step>

                      <Step
                        id="step3"
                        name={messages['wizard.am-step-name-3']}
                        desc={messages['wizard.am-step-desc-3']}
                      >
                        <MaterialPricingForm
                          innerRef={forms[2]}
                          onFormSubmitted={onStepFormSubmitted}
                          initialValues={fields[2] || {}}
                        />
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
                                <IntlMessages id="wizard.material-added" />
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
        </Colxx>
      </Row>
    </>
  );
};

export default injectIntl(AddMaterialWizard);
