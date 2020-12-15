// import React, { useEffect, useState } from 'react';
// import {
//   Row,
//   Card,
//   CardBody,
//   Nav,
//   NavItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownItem,
//   DropdownMenu,
//   TabContent,
//   TabPane,
// } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
// import classnames from 'classnames';
// import { injectIntl } from 'react-intl';

// import Breadcrumb from '../../../containers/navs/Breadcrumb';
// import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
// import IntlMessages from '../../../helpers/IntlMessages';
// import { smallChartData1, smallChartData2 } from '../../../data/charts';
// import { comments } from '../../../data/comments';

// import { SmallLineChart } from '../../../components/charts';
// import NewComments from '../../../containers/dashboard/NewComments';
// import BasicDetailsPane from '../../../containers/common/BasicDetailsPane';
// import apiMaterials from '../../../services/api/provider-related/materials';
// import urls from '../../../services/api/urls';
// import { books_dummy } from '../../../data/book';
// import IconCardsCarousel from '../../../containers/common/IconCardsCarousel';
// import data from '../../../data/iconCards';
// import { date } from 'yup';
// import MaterialSalesAreaChart from '../../../containers/common/MaterialSalesAreaChart';
// import { MaterialBasicSummaryReport } from '../../../components/common/MaterialBasicSummaryReport';

// const MaterialDetails = ({ match, type = 'book' }) => {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const id = match.params.id;
//     apiMaterials.getSingle(id).then((res) => {
//       console.log('what', res);
//       if (res.success) {
//         const data = res.data;
//         console.log('fine', data);
//         data.cover_img_url = urls.MAIN_URL + data.cover_img_url;
//         setDetails(data);
//       }
//       setLoading(false);
//     });
//   }, []);

//   const loadComments = async (startRow, size) => {
//     const id = match.params.id;
//     try {
//       let res = await apiMaterials.getRatings(id, { startRow, size });
//       if (res.success) {
//         const newComments = res.data.ratings.map(
//           ({ value: rating, description: content, reader }) => ({
//             rating,
//             content,
//             reviewerName: `${reader.firstname} ${reader.lastname}`,
//           })
//         );

//         return {
//           newComments,
//           hasMore: res.data.total_ratings >= startRow + size + 1,
//         };
//       }
//     } catch (error) {
//       return [];
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <div className="loading" />
//       ) : (
//         <Row>
//           <Colxx xxs="12">
//             <h1>{details.title}</h1>
//             <div className="text-zero top-right-button-container">
//               <UncontrolledDropdown>
//                 <DropdownToggle
//                   caret
//                   color="primary"
//                   size="lg"
//                   outline
//                   className="top-right-button top-right-button-single"
//                 >
//                   <IntlMessages id="pages.actions" />
//                 </DropdownToggle>
//                 <DropdownMenu>
//                   <DropdownItem header>
//                     <IntlMessages id="pages.header" />
//                   </DropdownItem>
//                   <DropdownItem disabled>
//                     <IntlMessages id="pages.delete" />
//                   </DropdownItem>
//                   <DropdownItem>
//                     <IntlMessages id="pages.another-action" />
//                   </DropdownItem>
//                   <DropdownItem divider />
//                   <DropdownItem>
//                     <IntlMessages id="pages.another-action" />
//                   </DropdownItem>
//                 </DropdownMenu>
//               </UncontrolledDropdown>
//             </div>
//             <Breadcrumb match={match} />
//             <Separator className="mb-5 mt-2" />

//             <Row>
//               <Colxx xxs="12" lg="4" className="mb-4">
//                 <Card className="mb-4">
//                   <img
//                     src={details.cover_img_url || '/assets/img/details/1.jpg'}
//                     alt="Detail"
//                     className="card-img-top"
//                   />
//                   <CardBody>
//                     <BasicDetailsPane type={type} details={details} />
//                   </CardBody>
//                 </Card>
//               </Colxx>

//               <Colxx xxs="12" lg="8">
//                 <MaterialBasicSummaryReport reports={details.reports} />

//                 <MaterialSalesAreaChart className="mb-4" />

//                 <NewComments
//                   className="mb-4"
//                   fetchData={loadComments}
//                   displayRate
//                 />
//               </Colxx>
//             </Row>
//           </Colxx>
//         </Row>
//       )}
//     </>
//   );
// };

// export default injectIntl(MaterialDetails);
