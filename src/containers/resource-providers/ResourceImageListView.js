import React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardImg } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';

const ResourceImageListView = ({ resource }) => {
  return (
    <Colxx
      xxs="12"
      lg="6"
      xl="4"
      className="mb-4"
      key={`resource_${resource.id}`}
    >
      <Card>
        <div className="position-relative">
          <NavLink to="#" location={{}} className="w-40 w-sm-100">
            <CardImg top alt={resource.title} src={resource.img} />
          </NavLink>
        </div>
        <CardBody>
          <NavLink to="#" location={{}} className="w-40 w-sm-100">
            <CardSubtitle>{resource.title}</CardSubtitle>
          </NavLink>
          <CardText className="text-muted text-small mb-0 font-weight-light">
            {resource.createDate}
          </CardText>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default React.memo(ResourceImageListView);
