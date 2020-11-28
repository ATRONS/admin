import React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardImg } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import MaterialImageListViewBody from './MaterialImageListViewBody';

const ResourceImageListView = ({ resource }) => {
  console.log('henok', resource);
  return (
    <Colxx
      xxs="12"
      lg="6"
      xl="3"
      className="mb-4"
      key={`resource_${resource.id}`}
    >
      <Card>
        <div className="position-relative">
          <NavLink to="#" location={{}} className="w-40 w-sm-100">
            <CardImg
              top
              alt={resource.title}
              src={resource.cover_img_url}
              style={{ maxHeight: '160px' }}
            />
          </NavLink>
        </div>
        <CardBody>
          <MaterialImageListViewBody resource={resource} />
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default React.memo(ResourceImageListView);
