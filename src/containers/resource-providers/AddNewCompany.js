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

const CompanySchema = Yup.object().shape({
  LegalName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Please enter your first name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  about: Yup.string()
    .min(10, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Please enter describtion about your company'),
  hq_address: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Please enter your address'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Office phone number is required'),
  foundOn: Yup.date().nullable().required('Date of establishement required'),
});

const AddNewCompanyModal = ({ modalOpen, toggleModal, handleSubmit }) => {
  const onSubmit = (values, actions) => {
    console.log(values);

    const {
      LegalName,
      displayName,
      email,
      foundOn,
      phone,
      about,
      hq_address,
    } = values;

    const payload = {
      legal_name: LegalName,
      display_name: displayName,
      email: email,
      phone,
      about,
      is_company: true,
      company_info: {
        hq_address: hq_address,
        founded_date: foundOn.toISOString(),
      },
      password: 'Dummy',
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
        <IntlMessages id="menu.add-new-company" />
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            LegalName: 'Ekelle Printing media and Service',
            displayName: 'Some what ekelele',
            email: 'henokdf@fjalskdf.com',
            foundOn: new Date(),
            hq_address: 'Mafi city mall, 6th floor, Addis Ababa, Ethiopia',
            phone: '0115541203',
            about:
              'jf alskdjf lasjdfl asjdflk asdjfl kasdjflk adsjglk adsjflkads jglkasdj glkasdjg lkasdjglkads jg',
          }}
          validationSchema={CompanySchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup className="error-l-75">
                <Label>Legal Name</Label>
                <Field className="form-control" name="firstName" />
                {errors.LegalName && touched.LegalName ? (
                  <div className="invalid-feedback d-block">
                    {errors.LegalName}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup className="error-l-75">
                <Label>Display Name (optional)</Label>
                <Field className="form-control" name="displayName" />
              </FormGroup>
              <FormGroup>
                <Label>Admin Email</Label>
                <Field className="form-control" name="email" type="email" />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label>Office Phone</Label>
                <Field className="form-control" name="phone" type="tel" />
                {errors.phone && touched.phone ? (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
                ) : null}
              </FormGroup>

              <FormGroup className="error-l-75">
                <Label>Address</Label>
                <Field className="form-control" name="hq_address" />
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

export default AddNewCompanyModal;
