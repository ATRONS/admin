import React from 'react';
import { CustomInput, FormGroup, Label, Row } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Colxx } from '../../components/common/CustomBootstrap';
import MaterialDropZone from './MaterialDropZone';
import { injectIntl } from 'react-intl';
import * as Yup from 'yup';

const MaterialPricingSchema = Yup.object().shape({
  free: Yup.bool(),
  selling: Yup.number()
    .nullable()
    .when('free', {
      is: true,
      otherwise: Yup.number().nullable().required('Selling Price is required'),
    }),
  renting: Yup.number()
    .nullable()
    .when('free', {
      is: true,
      otherwise: Yup.number().nullable().required('Renting Price is required'),
    }),
});

const MaterialPricingForm = ({
  innerRef,
  intl,
  onFormSubmitted,
  initialValues,
}) => {
  const { messages } = intl;

  return (
    <div className="wizard-basic-step">
      <Formik
        innerRef={innerRef}
        initialValues={{
          free: initialValues.type || false,
          selling: initialValues.type || '',
          renting: initialValues.type || '',
        }}
        onSubmit={(values) => {
          onFormSubmitted({
            price: {
              free: values.free,
              selling: values.selling || 0,
              rent: {
                value: values.renting || 0,
                per: 1,
              },
            },
          });
        }}
        validationSchema={MaterialPricingSchema}
      >
        {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
          <Form className="av-tooltip tooltip-label-right">
            <FormGroup>
              <CustomInput
                type="checkbox"
                id="exCustomCheckbox"
                name="free"
                value={values.free}
                onChange={(e) => setFieldValue('free', e.target.checked)}
                label={messages['forms.it-free']}
              />
            </FormGroup>
            {!values.free && (
              <>
                <FormGroup>
                  <Label>{messages['forms.selling-price']}</Label>
                  <Row>
                    <Colxx xxs="12" xl="6">
                      <Field
                        className="form-control"
                        name="selling"
                        type="number"
                      />
                    </Colxx>
                  </Row>
                  {errors.selling && touched.selling && (
                    <div className="invalid-feedback d-block">
                      {errors.selling}
                    </div>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>{messages['forms.renting-price']}</Label>
                  <Row>
                    <Colxx xxs="12" xl="6">
                      <Field
                        className="form-control"
                        name="renting"
                        type="number"
                      />
                    </Colxx>
                  </Row>
                  {errors.renting && touched.renting && (
                    <div className="invalid-feedback d-block">
                      {errors.renting}
                    </div>
                  )}
                </FormGroup>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default injectIntl(MaterialPricingForm);
