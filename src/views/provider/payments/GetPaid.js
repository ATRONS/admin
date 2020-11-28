import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import classnames from 'classnames';

const countDecimals = (num) => {
  let splitted = num.toString().split('.');
  return splitted.length > 1 ? splitted[1].length : 0;
};

const GetPaid = ({ match }) => {
  const availableBalance = 4560.36;
  const fee = 6;
  const minimumWithdrawableAmount = 100;

  const [amountError, setAmountError] = useState('');
  const [amount, setAmount] = useState('');
  const [formValid, setFormValid] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setError = (error) => {
    setAmountError(error);
    setFormValid(error === '');
  };

  const onAmountChange = (e) => {
    const val = Number(e.target.value);
    if (val) {
      console.log('Bechegnenet', countDecimals(val));
      if (val > availableBalance) {
        setError("Amount can't be greater than ETB " + availableBalance);
      } else if (countDecimals(e.target.value) !== 2) {
        setError('Amount must be a numerical value with two decimal places');
      } else if (val < minimumWithdrawableAmount) {
        setError("Amount can't be less than ETB " + minimumWithdrawableAmount);
      } else {
        setError('');
      }
      setAmount(e.target.value);
    } else {
      if (val == '') setAmount('');
      setError('Amount must be a numerical value with two decimal places');
    }
  };

  const onsubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 2000);
  };

  return (
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="payment.get_paid_now" match={match} />
        <Separator className="mb-5" />
      </Colxx>

      <Colxx xxs="12" lg="6">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="payment.withdrawal_request" />
            </CardTitle>

            {submitted ? (
              <div className="text-center">
                <i
                  className="simple-icon-check d-block mb-3 text-success"
                  style={{ fontSize: '3em' }}
                />

                <h1 className="mb-2 text-success">Success</h1>
                <p>Your withdrawal request has been successfully submitted.</p>
              </div>
            ) : (
              <Form onSubmit={onsubmit}>
                <FormGroup>
                  <Label for="exCustomCheckbox">
                    <strong>
                      <IntlMessages id="dashbaord.available_amount" />
                    </strong>
                  </Label>
                  <div>
                    <span>ETB 4560.34</span>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="exCustomInline">
                    <strong>
                      <IntlMessages id="forms.amount" />
                    </strong>
                  </Label>
                  <InputGroup className="mb-3" style={{ width: 'fit-content' }}>
                    <InputGroupAddon addonType="prepend">ETB</InputGroupAddon>
                    <Input
                      placeholder={'0.00'}
                      onChange={onAmountChange}
                      value={amount}
                      className="text-right"
                    />
                  </InputGroup>
                  <div className="text-danger">{amountError}</div>
                </FormGroup>

                <Row>
                  <Colxx xss={12}>
                    Withdrawal Fee (per payment) <br />
                    Other bank fees may apply.
                  </Colxx>
                  <Colxx xss={12}>
                    <strong>ETB {fee.toFixed(2)}</strong>
                  </Colxx>
                </Row>

                <Separator className="mt-3 mb-3" />

                <Row className="mb-3">
                  <Colxx xss={12}>
                    <strong>Total Amount</strong>
                  </Colxx>
                  <Colxx xss={12}>
                    <h2>
                      <strong>
                        ETB {amount > 0 && formValid ? amount - fee : '0.00'}
                      </strong>
                    </h2>
                  </Colxx>
                </Row>
                <Separator className="mt-3 mb-3" />

                <div className="mb-3 mt-3">
                  You are about to send{' '}
                  <strong>
                    ETB {amount > 0 && formValid ? amount - fee : '0.00'}
                  </strong>{' '}
                  to your Hello Cash account
                </div>

                <Button
                  color="primary"
                  type="submit"
                  className={` mt-3 btn-multiple-state  ${classnames({
                    'show-spinner': submitting,
                  })}`}
                  disabled={!formValid}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Get Paid Now</span>
                </Button>
              </Form>
            )}
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default GetPaid;
