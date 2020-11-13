import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ResourceImageListView from './ResourceImageListView';

const ResourceListing = ({
  providers,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  return (
    <Row>
      {providers.map((provider) => {
        return <ResourceImageListView key={provider.id} resource={provider} />;
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default ResourceListing;
