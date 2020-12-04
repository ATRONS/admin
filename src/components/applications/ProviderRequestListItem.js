import React from 'react';
import { Card, CardBody, Badge, CustomInput } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Colxx } from '../common/CustomBootstrap';

const requestCategories = [
  {
    id: '0',
    label: 'Pending',
  },
];

const ProviderRequestListItem = ({ item }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <span className="align-middle d-inline-block flex-grow-1">
              {item.title}
            </span>
            <p className="mb-1 text-muted text-small w-xs-100 ml-4">
              {item.category}
            </p>
            <p className="mb-1 text-muted text-small w-xs-100 ml-4">
              {item.createDate.toLocaleDateString()}
            </p>
            <div className="mb-1 text-muted text-small w-xs-100 ml-4">
              <Badge color={item.labelColor} pill>
                {item.status}
              </Badge>
            </div>
          </CardBody>
        </div>
        {/* <div className="card-body pt-1">
          <p className="mb-0">{item.describtion}</p>
        </div> */}
      </Card>
    </Colxx>
  );
};

export default React.memo(ProviderRequestListItem);
