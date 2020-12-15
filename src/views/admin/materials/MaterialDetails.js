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
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import {
  smallChartData1,
  smallChartData2,
  smallChartData3,
} from '../../../data/charts';
import { comments } from '../../../data/comments';
import { books_dummy } from '../../../data/book';

import { SmallLineChart } from '../../../components/charts';
import NewComments from '../../../containers/dashboard/NewComments';
import BasicDetailsPane from '../../../containers/common/BasicDetailsPane';
import apiMaterials from '../../../services/api/materials';
import urls from '../../../services/api/urls';
import { MaterialBasicSummaryReport } from '../../../components/common/MaterialBasicSummaryReport';

const MaterialDetails = ({ match, intl, type }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = match.params.id;
    apiMaterials.getSingle(id).then((res) => {
      if (res.success) {
        const data = res.data;

        data.cover_img_url = urls.MAIN_URL + data.cover_img_url;
        setDetails(data);
        setLoading(false);
      }
    });
  }, []);

  const loadComments = (pageIndex) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(comments);
      }, 2000);
    });
  };

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
                  <DropdownItem disbled>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <Breadcrumb match={match} />
            <Separator className="mb-5 mt-2" />

            <Row>
              <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                  <img
                    src={details.cover_img_url || '/assets/img/details/1.jpg'}
                    alt="Detail"
                    className="card-img-top ml-2 mr-2"
                  />
                  <CardBody>
                    <BasicDetailsPane type={type} details={details} />
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8">
                <Row>
                  <MaterialBasicSummaryReport reports={details.reports} />
                </Row>

                <NewComments
                  className="mb-4"
                  fetchData={loadComments}
                  displayRate
                />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default injectIntl(MaterialDetails);
