/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { FormGroup, Label, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';
import Select from 'react-select';
import MaterialDropZone from './MaterialDropZone';
import { injectIntl } from 'react-intl';
import * as Yup from 'yup';
import { FormikReactSelect } from '../resource-providers/FormikFields';

const selectData = [
  { label: 'Book', value: 'book', key: 0 },
  { label: 'Newspaper', value: 'newspapaer', key: 1 },
  { label: 'Magazine', value: 'magazine', key: 2 },
];
const validateType = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your name';
  }
  return error;
};

const MaterialBasicSchema = Yup.object().shape({
  type: Yup.string().required('Please select one of the options'),
  file: Yup.object().nullable().required('Material file is required'),
});

const MaterialBasicForm = ({
  innerRef,
  intl,
  onFormSubmitted,
  initialValues,
}) => {
  const [file, setFile] = useState(null);
  const { messages } = intl;

  console.log('Why is that', initialValues);
  return (
    <div className="wizard-basic-step">
      <Formik
        innerRef={innerRef}
        initialValues={{
          type: initialValues.type || '',
          file: initialValues.file || null,
        }}
        onSubmit={onFormSubmitted}
        validationSchema={MaterialBasicSchema}
      >
        {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
          <Form className="av-tooltip tooltip-label-right">
            <FormGroup>
              <Label>{messages['forms.material-type']}</Label>
              <Row>
                <Colxx xxs="12" xl="6">
                  <FormikReactSelect
                    name="type"
                    value={values.type}
                    options={selectData}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </Colxx>
              </Row>

              {errors.type && touched.type && (
                <div className="invalid-feedback d-block">{errors.type}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.select-file']}</Label>
              <MaterialDropZone name="file" onChange={setFieldValue} />
              {errors.file && touched.file && (
                <div className="invalid-feedback d-block">{errors.file}</div>
              )}
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default injectIntl(MaterialBasicForm);
