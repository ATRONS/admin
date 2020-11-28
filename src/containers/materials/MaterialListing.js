import React from 'react';
import { Row } from 'reactstrap';
import MaterialListView from './MaterialListView';
import ResourceImageListView from '../common/ResourceImageListView';
import Pagination from '../common/Pagination';

const MaterialListing = ({
  items,
  displayMode,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((item) => {
        if (displayMode === 'imagelist') {
          return <ResourceImageListView key={item.id} resource={item} />;
        }
        if (displayMode === 'thumblist') {
          return <MaterialListView key={item.id} material={item} />;
        }
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(MaterialListing);
