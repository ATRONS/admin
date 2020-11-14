import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  CardSubtitle,
  CardText,
  CardImg,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import SingleLightbox from '../../../../components/pages/SingleLightbox';
import productData from '../../../../data/products';

const products = productData.slice(0, 15);

const AuthorProfile = ({ match }) => {
  const [] = useState('details');

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Sarah Kortney</h1>
          <div className="text-zero top-right-button-container">
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                color="primary"
                size="lg"
                outline
                className="top-right-button top-right-button-single"
              >
                <IntlMessages id="pages.actions" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <IntlMessages id="pages.deactivate" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          <Breadcrumb match={match} />
          <Separator className="mb-5 mt-2" />

          <Row>
            <Colxx xxs="12" lg="4" className="mb-4 col-left">
              <Card className="mb-4">
                <SingleLightbox
                  thumb="/assets/img/profiles/1.jpg"
                  large="/assets/img/profiles/1.jpg"
                  className="card-img-top"
                />

                <CardBody>
                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="menu.about" />
                  </p>
                  <p className="mb-3">
                    I’m a web developer. I spend my whole day, practically every
                    day, experimenting with HTML, CSS, and JavaScript; dabbling
                    with Python and Ruby; and inhaling a wide variety of
                    potentially useless information through a few hundred RSS
                    feeds. I build websites that delight and inform. I do it
                    well.
                  </p>
                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.email" />
                  </p>
                  <p className="mb-3">Henokdejen84@gmail.com</p>

                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.phoneNumber" />
                  </p>
                  <p className="mb-3">+251911932901</p>

                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.birthDate" />
                  </p>
                  <p className="mb-3">07-02-1996</p>
                </CardBody>
              </Card>
            </Colxx>

            <Colxx xxs="12" lg="8" className="mb-4 col-right">
              <Row>
                {products.map((product) => {
                  return (
                    <Colxx
                      xxs="12"
                      lg="6"
                      xl="4"
                      className="mb-4"
                      key={`product_${product.id}`}
                    >
                      <Card>
                        <div className="position-relative">
                          <NavLink
                            to="#"
                            location={{}}
                            className="w-40 w-sm-100"
                          >
                            <CardImg
                              top
                              alt={product.title}
                              src={product.img}
                            />
                          </NavLink>
                        </div>
                        <CardBody>
                          <NavLink
                            to="#"
                            location={{}}
                            className="w-40 w-sm-100"
                          >
                            <CardSubtitle>{product.title}</CardSubtitle>
                          </NavLink>
                          <CardText className="text-muted text-small mb-0 font-weight-light">
                            {product.createDate}
                          </CardText>
                        </CardBody>
                      </Card>
                    </Colxx>
                  );
                })}
              </Row>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default AuthorProfile;
