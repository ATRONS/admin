/* eslint-disable no-param-reassign */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import MaterialDropZone from './MaterialDropZone';
import DatePicker from 'react-datepicker';
import { FormikReactSelect } from '../resource-providers/FormikFields';
import * as Yup from 'yup';
import { injectIntl } from 'react-intl';

const selectData = [
  { label: 'Book', value: 'book', key: 0 },
  { label: 'Newspaper', value: 'newspapaer', key: 1 },
  { label: 'Magazine', value: 'magazine', key: 2 },
];

const MaterialDetailSchema = Yup.object().shape({
  title: Yup.string().required('Please select one of the options'),
  subtitle: Yup.string().notRequired().max(50, "Can't exceed 50 characters"),
  cover_img_url: Yup.string().required('Cover image is required'),
  published_date: Yup.date().nullable().required('Published date is required'),
  display_date: Yup.date().notRequired().nullable(),
  pages: Yup.number().required('Number of pages is required'),
  edition: Yup.number().required('Edition number is required'),
});

const MaterialDetailedForm = ({
  innerRef,
  intl,
  initialValues,
  onFormSubmitted,
  materialType,
  tags
}) => {
  const { messages } = intl;

  return (
    <div className="wizard-basic-step">
      <Formik
        innerRef={innerRef}
        initialValues={{
          title: initialValues.title || '',
          subtitle: initialValues.subtitle || '',
          cover_img_url: initialValues.cover_img_url || '',
          published_date: initialValues.published_date || null,
          display_date: initialValues.display_date || '',
          ISBN: initialValues.ISBN || '',
          synopsis: initialValues.synopsis || '',
          review: initialValues.review || '',
          tags: initialValues.tags || [],
          pages: initialValues.pages || '',
          edition: initialValues.edition || '',
        }}
        onSubmit={onFormSubmitted}
        validationSchema={MaterialDetailSchema}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
          console.log(values, errors)
          return (
          
          <Form className="av-tooltip tooltip-label-right">
            <FormGroup>
              <Label>{messages['forms.title']}</Label>
              <Field className="form-control" name="title" />
              {errors.title && touched.title && (
                <div className="invalid-feedback d-block">{errors.title}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.sub-title']}</Label>
              <Field className="form-control" name="subtitle" />
              {errors.subtitle && touched.subtitle && (
                <div className="invalid-feedback d-block">
                  {errors.subtitle}
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.cover-image']}</Label>
              <MaterialDropZone name="cover_img_url" onChange={(name, data) => setFieldValue('cover_img_url', data.url)} />
              {errors.cover_img_url && touched.cover_img_url && (
                <div className="invalid-feedback d-block">
                  {errors.cover_img_url}
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.published-date']}</Label>
              <DatePicker
                selected={values.published_date}
                onChange={(d) => setFieldValue('published_date', d)}
                placeholderText={messages['forms.date']}
              />
              {errors.published_date && touched.published_date && (
                <div className="invalid-feedback d-block">
                  {errors.published_date}
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.isbn']}</Label>
              <Field className="form-control" name="ISBN" />
              {errors.ISBN && touched.ISBN && (
                <div className="invalid-feedback d-block">{errors.ISBN}</div>
              )}
            </FormGroup>
            {materialType === 'book' && (
              <FormGroup>
                <Label>{messages['forms.synopsis']}</Label>
                <Field
                  className="form-control"
                  name="synopsis"
                  component="textarea"
                />

                {errors.synopsis && touched.synopsis && (
                  <div className="invalid-feedback d-block">
                    {errors.synopsis}
                  </div>
                )}
              </FormGroup>
            )}
            <FormGroup>
              <Label>{messages['forms.tags']}</Label>
              <FormikReactSelect
                name="tags"
                value={values.tags}
                options={tags}
                isMulti
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              {errors.tags && touched.tags && (
                <div className="invalid-feedback d-block">{errors.tags}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.pages']}</Label>
              <Field className="form-control" name="pages" type="number" />

              {errors.pages && touched.pages && (
                <div className="invalid-feedback d-block">{errors.pages}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{messages['forms.edition']}</Label>
              <Field className="form-control" name="edition" type="number" />

              {errors.edition && touched.edition && (
                <div className="invalid-feedback d-block">{errors.edition}</div>
              )}
            </FormGroup>
          </Form>
        )
              }
      }
      </Formik>
    </div>
  );
};

export default injectIntl(MaterialDetailedForm);
