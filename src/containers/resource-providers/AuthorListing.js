import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import AuthorThumbListView from './AuthorThumbListView';

function collect(props) {
  return { data: props.data };
}

const AuthorsListing = ({
  authors,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {authors.map((author) => {
        return (
          <AuthorThumbListView
            key={author.id}
            author={author}
            isSelect={selectedItems.includes(author.id)}
            collect={collect}
            onCheckItem={onCheckItem}
          />
        );
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

export default React.memo(AuthorsListing);
