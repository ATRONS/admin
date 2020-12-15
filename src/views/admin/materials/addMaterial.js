import Breadcrumb from '../../../containers/navs/Breadcrumb';

import React, { createRef, useState, useEffect } from 'react';
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
import apiMaterials from '../../../services/api/materials';

const dummyTags = [
  {
    value: '5face2c3e90aba294074feed',
    label: 'fiction',
  },
  {
    value: '5face2c3e90aba294074feee',
    label: 'history',
  },
  {
    value: '5face2c3e90aba294074feef',
    label: 'thriller',
  },
  {
    value: '5face2c3e90aba294074fef0',
    label: 'science_fiction',
  },
  {
    value: '5face2c3e90aba294074fef1',
    label: 'biography',
  },
];

const AddMaterialWizard = ({ match, intl }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [tags, setTags] = useState(dummyTags);

  const [fields, setFields] = useState([]);
  const [] = useState('');

  // step 2 related
  const [] = useState(new Date());
  const [nextHandler, setNextHandler] = useState(null);

  const asyncLoading = (data) => {};

  useEffect(() => {
    apiMaterials.getAllTags().then((res) => {
      if (res.success) {
        // filter the data
        let taggs = res.data.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));
        setTags(taggs);
        setTagsLoaded(true);
      }
    });
  }, []);

  const submitMaterialData = (data) => {
    // let's filter out everything here
    console.log('Final data', data);

    data.provider = data.provider.value;
    data.published_date = data.published_date.toISOString();
    data.tags = data.tags.map((tg) => tg.value);
    data.type = data.type.toUpperCase();
    console.log('Final data', data);

    setLoading(true);
    apiMaterials.post(data).then((res) => {
      if (res.success) {
        console.log('Added Successfully');
      }
      setLoading(false);
    });
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
  console.log('Who', fields[0]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.add-material" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {!tagsLoaded ? (
        <div className="loading"></div>
      ) : (
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
                            tags={tags}
                            onFormSubmitted={onStepFormSubmitted}
                            initialValues={fields[1] || {}}
                            materialType={fields[0] ? fields[0].type : ''}
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
      )}
    </>
  );
};

export default injectIntl(AddMaterialWizard);
