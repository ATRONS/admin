import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import Rating from '../../components/common/Rating';

const MaterialListView = ({ material, isSelect, collect, onCheckItem }) => {
  const materialDetailUrl = 'materials/' + (material.id || material._id);
  return (
    <Colxx xxs="12" key={material._id} className="mb-3">
      <Card
        className={classnames('d-flex flex-row', {
          active: isSelect,
        })}
      >
        <NavLink to={materialDetailUrl} className="d-flex">
          <img
            alt={material.title}
            src={'/assets/img/products/marble-cake-thumb.jpg'}
            className="list-thumbnail responsive border-0 card-img-left"
          />
        </NavLink>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={materialDetailUrl} className="w-30 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {material.title || material.sub_title}
              </p>
            </NavLink>
            <p className="mb-1 text-muted text-small w-20 w-sm-100 mr-2">
              {material.sub_title || 'No subtitle'}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {material.price ? material.price.selling : '0'} ETB
            </p>
            <Rating
              total={5}
              rating={material.rating ? material.rating.value : '2'}
              interactive={false}
            />
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(MaterialListView);
