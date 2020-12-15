import React from 'react';
import { CardSubtitle, CardText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Rating from '../../components/common/Rating';
import { formatMoney } from '../../helpers/sales';

const MaterialImageListViewBody = ({ resource }) => {
  return (
    <>
      <NavLink to="#" location={{}} className="w-40 w-sm-100">
        <CardSubtitle>{resource.title}</CardSubtitle>
      </NavLink>
      <CardText className="text-muted text-small mb-2 font-weight-light d-flex justify-content-between">
        <span>{resource.display_date} </span>
        <span> {formatMoney(40)}</span>
      </CardText>
      <Rating total={5} rating={4.5} interactive={false} />
    </>
  );
};

export default MaterialImageListViewBody;
