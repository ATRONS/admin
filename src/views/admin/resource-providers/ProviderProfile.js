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
import { Authors_Dummy } from '../../../data/authors';
import { books_dummy } from '../../../data/book';
import { companies_Dummy } from '../../../data/companies';
import apiProviders from '../../../services/api/provider';
import apiMaterials from '../../../services/api/materials';
import urls from '../../../services/api/urls';
import BasicDetailsPane from '../../../containers/common/BasicDetailsPane';

const products = productData.slice(0, 15);

const ProviderProfile = ({ match, type }) => {
  const [activeTab, setActiveTab] = useState('reports');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  const [resources, setresources] = useState([]);
  const [resourcesLoading, setresourcesLoading] = useState(false);
  const [resourcesLoaded, setresourcesLoaded] = useState(false);

  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize]);

  useEffect(() => {
    // console.log('Hello', match);
    const id = match.params.id;
    apiProviders.getSingle(id).then((res) => {
      if (res.success) {
        console.log('res', res.data);
        setProfileDetails(res.data);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (activeTab == 'materials' && !resourcesLoaded && !resourcesLoading) {
      setresourcesLoading(true);
      apiMaterials.getAll({ provider: profileDetails._id }).then((res) => {
        if (res.success) {
          const newMaterials = res.data.materials.map((mat) => {
            mat.cover_img_url = urls.MAIN_URL + mat.cover_img_url;
            return mat;
          });

          setresources(newMaterials);
          setTotalPage(Math.ceil(newMaterials.total_materials / 5));
          setresourcesLoading(false);
          setresourcesLoaded(true);
        }
      });
    }
  }, [activeTab]);

  return (
    <>
      {loading ? (
        <div className="loading" />
      ) : (
        <Row>
          <Colxx xxs="12">
            <h1>{profileDetails.legal_name}</h1>
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
                    <BasicDetailsPane type={type} details={profileDetails} />
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
                      <IntlMessages
                        id={
                          type == 'author'
                            ? 'pages.books'
                            : 'pages.mag_or_newspapaers'
                        }
                      />
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="reports">
                    <ProviderReporting
                      data={{
                        summary: {
                          total_sells_amount: profileDetails.total_sells_amount,
                          total_sells_count: profileDetails.total_sells_count,
                          total_materials_count:
                            profileDetails.total_materials_count,
                          available_balance: profileDetails.available_balance,
                        },

                        sells_report: profileDetails.sells_report,
                      }}
                    />
                  </TabPane>
                  <TabPane tabId="materials">
                    <Row>
                      {resourcesLoading ? (
                        <div className="loading" />
                      ) : (
                        <ResourceListing
                          providers={resources}
                          currentPage={currentPage}
                          totalPage={totalPage}
                          onChangePage={setCurrentPage}
                        />
                      )}
                    </Row>
                  </TabPane>
                </TabContent>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      )}
    </>
  );
};
export default ProviderProfile;
