import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CustomInput,
} from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import ThumbnailImage from '../../components/cards/ThumbnailImage';

const AuthorThumbListView = ({ author, isSelect, collect, onCheckItem }) => {
  const authorProfileUrl = 'authors/' + author._id;
  return (
    <Colxx xxs="12" md="6" lg="4" key={author.id}>
      <ContextMenuTrigger id="menu_id" data={author.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, author.id)}
          className={classnames('d-flex flex-row mb-4', {
            active: isSelect,
          })}
        >
          <NavLink to={authorProfileUrl} className="d-flex">
            <ThumbnailImage
              rounded
              small
              alt={author.title}
              src="http://localhost:3000/assets/img/products/bebinca-thumb.jpg"
              className="m-4"
            />
          </NavLink>
          <div className=" d-flex flex-grow-1 min-width-zero">
            <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
              <div className="min-width-zero">
                <NavLink to={authorProfileUrl}>
                  <CardSubtitle className="truncate mb-1">
                    {author.legal_name || author.display_name}
                  </CardSubtitle>
                </NavLink>

                <CardText className="text-muted text-small mb-2">
                  {author.total_materials}
                </CardText>
              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${author.id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                />
              </div>
            </CardBody>
          </div>
        </Card>{' '}
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(AuthorThumbListView);
