import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';
import Footer from '../containers/navs/Footer';
import TopnavProvider from '../containers/navs/TopnavProvider';

const InActiveAccountAppLayout = ({
  containerClassnames,
  children,
  history,
}) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopnavProvider history={history} />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(InActiveAccountAppLayout)
);
