import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';

import apiMaterials from '../../../services/api/provider-related/materials';
import MaterialListingHeading from '../../../containers/materials/MaterialListingHeading';
import MaterialListing from '../../../containers/materials/MaterialListing';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { books_dummy } from '../../../data/book';
const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];
const MaterialListingPage = ({ match }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchIdRef = React.useRef(0);

  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(2);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = React.useCallback(() => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    if (fetchId === fetchIdRef.current) {
      const startRow = selectedPageSize * (currentPage - 1);
      const endRow = startRow + selectedPageSize;
      apiMaterials
        .getAll({
          start: startRow,
          size: selectedPageSize,
          search,
        })
        .then((res) => {
          if (res.success) {
            const newBooks = res.data.materials;
            console.log('Fetching', startRow, endRow);

            setMaterials(newBooks.slice(startRow, endRow));
            setTotalPage(
              Math.ceil(res.data.total_materials / selectedPageSize)
            );
          }
          setLoading(false);
        });
    }
  }, []);

  // const fetchData = React.useCallback(() => {
  //   const fetchId = ++fetchIdRef.current;
  //   setLoading(true);
  //   if (fetchId === fetchIdRef.current) {
  //     const startRow = selectedPageSize * (currentPage - 1);
  //     const endRow = startRow + selectedPageSize;

  //     setMaterials(books_dummy);
  //     setTotalPage(Math.ceil(books_dummy.length / selectedPageSize));
  //   }
  //   setLoading(false);
  // }, []);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return (
    <div className="materials-page-wrapper">
      <Row>
        <Colxx xxs="10 m-auto">
          <MaterialListingHeading
            heading="menu.materials"
            displayMode={displayMode}
            changeDisplayMode={setDisplayMode}
            changeOrderBy={(column) => {
              setSelectedOrderOption(
                orderOptions.find((x) => x.column === column)
              );
            }}
            changePageSize={setSelectedPageSize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            selectedOrderOption={selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={materials.length}
            onSearchKey={(e) => {
              if (e.key === 'Enter') {
                setSearch(e.target.value.toLowerCase());
              }
            }}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={() => setModalOpen(!modalOpen)}
          />
          <MaterialListing
            items={materials}
            displayMode={displayMode}
            currentPage={currentPage}
            totalPage={totalPage}
            onChangePage={setCurrentPage}
          />
        </Colxx>
      </Row>
    </div>
  );
};

export default injectIntl(MaterialListingPage);
