import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';

const CompanyListView = ({ company, isSelect, collect, onCheckItem }) => {
  const companyProfileUrl = 'companies/' + company._id;
  console.log('hoy', company);
  return (
    <Colxx xxs="12" key={company.id} className="mb-3">
      <Card
        onClick={(event) => onCheckItem(event, company.id)}
        className={classnames('d-flex flex-row', {
          active: isSelect,
        })}
      >
        <NavLink to={companyProfileUrl} className="d-flex">
          <img
            alt={company.legal_name}
            src={
              company.avatarUrl || '/assets/img/products/marble-cake-thumb.jpg'
            }
            className="list-thumbnail responsive border-0 card-img-left"
          />
        </NavLink>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={companyProfileUrl} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {company.legal_name || company.display_name}
              </p>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {/* {company.category} */}
              Some category
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {/* {company.date} */}
              Lela tarik
            </p>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CompanyListView);
