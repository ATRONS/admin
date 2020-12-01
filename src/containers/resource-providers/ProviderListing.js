import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../common/Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import AuthorThumbListView from './AuthorThumbListView';
import CompanyListView from './CompanyListView';

function collect(props) {
  return { data: props.data };
}

const ProviderListing = ({
  providers,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  providerType,
}) => {
  return (
    <Row>
      {providers.map((provider) => {
        if (providerType === 'author') {
          return (
            <AuthorThumbListView
              key={provider._id}
              author={provider}
              isSelect={selectedItems.includes(provider.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        } else {
          return (
            <CompanyListView
              key={provider._id}
              company={provider}
              isSelect={selectedItems.includes(provider.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default ProviderListing;
