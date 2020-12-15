import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Badge,
  CustomInput,
  Collapse,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Colxx } from '../common/CustomBootstrap';
import { getFormattedDate } from '../../helpers/dateHelper';
import IntlMessages from '../../helpers/IntlMessages';
import { formatMoney } from '../../helpers/sales';

export const AdminRequestListItem = ({
  item,
  processing,
  acceptRequest,
  onDeny,
}) => {
  const [open, setOpen] = useState(false);

  const provider = item.provider;

  const ProcessingButtons = (
    <div className="mb-1 text-muted text-small w-xs-100 ml-4">
      <div className="mt-4 mb-4">
        <Button
          outline
          color="secondary"
          className="mr-2"
          disabled={item.processing}
          onClick={onDeny}
        >
          Deny
        </Button>

        <Button
          color="primary"
          className={`mr-2 btn-shadow btn-multiple-state ${
            item.processing ? 'show-spinner' : ''
          }`}
          disabled={item.processing}
          onClick={(e) => {
            acceptRequest(item._id);
          }}
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">Accept</span>
        </Button>
      </div>
    </div>
  );

  const details =
    item.category === 'WITHDRAWAL' ? (
      <>
        <table>
          <tbody>
            <tr className="mb-2">
              <td className="fit-content-cell pr-2">
                {' '}
                <strong> Provider Name:</strong>
              </td>
              <td>{provider.legal_name}</td>
            </tr>

            <tr>
              <td className="fit-content-cell pr-2">
                <strong> category:</strong>
              </td>
              <td>{item.category}</td>
            </tr>

            <tr>
              <td className="fit-content-cell pr-2">
                <strong> Amount:</strong>
              </td>
              <td>{formatMoney(item.amount)}</td>
            </tr>

            <tr>
              <td className="fit-content-cell pr-2">
                <strong> Requested on:</strong>
              </td>
              <td>{getFormattedDate(item.created_at)}</td>
            </tr>

            {item.status !== 'PENDING' && (
              <tr>
                <td className="fit-content-cell pr-2">
                  <strong> Processed on:</strong>
                </td>
                <td>{getFormattedDate(item.updated_at)}</td>
              </tr>
            )}

            <tr>
              <td className="fit-content-cell pr-2">
                <strong> Status:</strong>
              </td>
              <td> {item.status}</td>
            </tr>
          </tbody>
        </table>

        {item.status === 'PENDING' && ProcessingButtons}
      </>
    ) : (
      <></>
    );

  return (
    <Colxx xxs="12">
      <Card className="card  mb-3">
        <CardBody className="">
          {/* <span className="align-middle d-inline-block flex-grow-1">
                  {item.description}
                </span> */}
          <div
            className="d-flex flex-grow-1 min-width-zero align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
            onClick={(e) => setOpen(!open)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex ">
              <p className="mb-1 text-muted text-small w-xs-100 mr-3 text-uppercase">
                <strong> {item.provider.legal_name} </strong>
              </p>

              <p className="mb-1 text-muted text-small w-xs-100 ">
                {item.category}
              </p>
              {item.category === 'WITHDRAWAL' && (
                <p className="mb-1 text-muted text-small w-xs-100 ml-4">
                  {formatMoney(item.amount)}
                </p>
              )}
              <p className="mb-1 text-muted text-small w-xs-100 ml-4">
                {getFormattedDate(item.created_at)}
              </p>
              <div className="mb-1 text-muted text-small w-xs-100 ml-4">
                <Badge color={item.labelColor} pill>
                  {item.status}
                </Badge>
              </div>
            </div>
          </div>

          <Collapse isOpen={open} className="mt-4">
            {details}
          </Collapse>
        </CardBody>
        {/* <div className="card-body pt-1">
              <p className="mb-0">{item.describtion}</p>
            </div> */}
      </Card>
    </Colxx>
  );
};
