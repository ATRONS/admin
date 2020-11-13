import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  Collapse,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import SingleLightbox from '../../../../components/pages/SingleLightbox';
import recentPostsData from '../../../../data/recentposts';
import RecentPost from '../../../../components/common/RecentPost';
import productData from '../../../../data/products';
import UserCardBasic from '../../../../components/cards/UserCardBasic';
import friendsData from '../../../../data/follow';
import ResourceListing from '../../../../containers/resource-providers/ResourceListing';

const products = productData.slice(0, 5);
const pageSizes = [4, 8, 12, 20];

const CompanyProfile = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [resources, setresources] = useState([]);

  // delete author related
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    // fetchData();
    setTotalPage(2);
    setresources(products);
    setSelectedItems([]);
    setTotalItemCount(products.length);
    setIsLoaded(true);
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Some Company Name</h1>
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
                    <IntlMessages id="pages.location" />
                  </p>
                  <p className="mb-3">Addis Ababa, Ethiopia</p>

                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.phoneNumber" />
                  </p>
                  <p className="mb-3">+251911932901</p>

                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.foundOn" />
                  </p>
                  <p className="mb-3">07-02-1996</p>
                </CardBody>
              </Card>
            </Colxx>

            <Colxx xxs="12" lg="8" className="mb-4 col-right">
              <div className="mb-2">
                <Collapse
                  isOpen={displayOptionsIsOpen}
                  className="d-md-block"
                  id="displayOptions"
                >
                  <div className="d-block d-md-inline-block pt-1">
                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                      <input
                        type="text"
                        name="keyword"
                        id="search"
                        placeholder={'Search'}
                      />
                    </div>
                  </div>
                  <div className="float-md-right pt-1">
                    <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {selectedPageSize}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {pageSizes.map((size, index) => {
                          return (
                            <DropdownItem key={index} onClick={() => {}}>
                              {size}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Collapse>
              </div>
              <Row>
                <ResourceListing
                  providers={resources}
                  currentPage={currentPage}
                  totalPage={totalPage}
                  onChangePage={setCurrentPage}
                />
              </Row>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default CompanyProfile;
