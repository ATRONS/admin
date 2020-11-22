import React, { useEffect, useState } from 'react';
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
  TabContent,
  TabPane,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import SingleLightbox from '../../../components/pages/SingleLightbox';
import productData from '../../../data/products';
import classnames from 'classnames';
import ResourceListing from '../../../containers/resource-providers/ResourceListing';
import ProviderReporting from '../../../containers/resource-providers/ProviderReporting';

const products = productData.slice(0, 15);

const AuthorProfile = ({ match }) => {
  const [activeTab, setActiveTab] = useState('reports');
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [resources, setresources] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize]);

  useEffect(() => {
    // fetchData();
    setTotalPage(2);
    setresources(products.slice(0, 5));
    setSelectedItems([]);
    // setTotalItemCount(products.length);
    setIsLoaded(true);
  }, [selectedPageSize, currentPage, search]);

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
              <Nav tabs className="separator-tabs ml-0 mb-5">
                <NavItem>
                  <NavLink
                    location={{}}
                    to="#"
                    className={classnames({
                      active: activeTab === 'reports',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('reports')}
                  >
                    <IntlMessages id="pages.reports" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    location={{}}
                    to="#"
                    className={classnames({
                      active: activeTab === 'materials',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('materials')}
                  >
                    <IntlMessages id="pages.books" />
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="reports">
                  <ProviderReporting />
                </TabPane>
                <TabPane tabId="materials">
                  <Row>
                    <ResourceListing
                      providers={resources}
                      currentPage={currentPage}
                      totalPage={totalPage}
                      onChangePage={setCurrentPage}
                    />
                  </Row>
                </TabPane>
              </TabContent>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default AuthorProfile;
