import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Rating from '../../../components/common/Rating';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { smallChartData1, smallChartData2 } from '../../../data/charts';
import { comments } from '../../../data/comments';
import { books } from '../../../data/book';

import { SmallLineChart } from '../../../components/charts';
import NewComments from '../../../containers/dashboard/NewComments';

const BookDetail = ({ match, intl }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDetails(books[0]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading" />
      ) : (
        <Row>
          <Colxx xxs="12">
            <h1>{details.title}</h1>
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
                  <DropdownItem header>
                    <IntlMessages id="pages.header" />
                  </DropdownItem>
                  <DropdownItem disabled>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <Breadcrumb match={match} />
            <Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
                <NavLink
                  location={{}}
                  to="#"
                  className={classnames({
                    active: activeTab === 'details',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveTab('details')}
                >
                  <IntlMessages id="pages.details" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  location={{}}
                  to="#"
                  className={classnames({
                    active: activeTab === 'orders',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveTab('transactions')}
                >
                  <IntlMessages id="pages.orders" />
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="details">
                <Row>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <Card className="mb-4">
                      <img
                        src="/assets/img/details/1.jpg"
                        alt="Detail"
                        className="card-img-top"
                      />
                      <CardBody>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.sub-title" />
                        </p>
                        <p className="mb-3">{details.subtitle}</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.isbn" />
                        </p>
                        <p className="mb-3">{details.ISBN}</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.rating" />
                        </p>
                        <div className="mb-3">
                          <Rating total={5} rating={5} interactive={false} />
                        </div>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.selling-price" />
                        </p>
                        <p className="mb-3">{details.price.selling} ETB</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.renting-price" />
                        </p>
                        <p className="mb-3">
                          {details.price.rent.value} ETB/hr
                        </p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.published-date" />
                        </p>
                        <p className="mb-3">{details.published_date}</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.uploaded-on" />
                        </p>
                        <p className="mb-3">{details.published_date}</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.tags" />
                        </p>
                        <div className="mb-3">
                          <p className="d-sm-inline-block mb-1">
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Flour
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Chocolate
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Caster Sugar
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Baking Powder
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Milk
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Eggs
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Vegetable Oil
                            </Badge>
                          </p>
                        </div>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.pages" />
                        </p>
                        <p className="mb-3">{details.pages}</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.edition" />
                        </p>
                        <p className="mb-3">{details.edition}</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.language" />
                        </p>
                        <p className="mb-3">Amharic</p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.synopsis" />
                        </p>
                        <p className="mb-3">{details.synopsis}</p>
                      </CardBody>
                    </Card>
                  </Colxx>

                  <Colxx xxs="12" lg="8">
                    <Row>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart-analytics">
                          <CardBody>
                            <SmallLineChart data={smallChartData1} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart-analytics">
                          <CardBody>
                            <SmallLineChart data={smallChartData2} />
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Row>

                    <NewComments
                      className="mb-4"
                      comments={comments}
                      displayRate
                    />
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="transactions">Lela</TabPane>
            </TabContent>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default injectIntl(BookDetail);
