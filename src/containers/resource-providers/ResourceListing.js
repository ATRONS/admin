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
    <>
      {providers.map((provider) => {
        return <ResourceImageListView key={provider._id} resource={provider} />;
      })}
      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i) => onChangePage(i)}
        />
      )}
    </>
  );
};

export default ResourceListing;
