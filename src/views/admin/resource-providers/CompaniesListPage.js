import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { servicePath } from '../../../constants/defaultValues';

import ResourceProvidersHeading from '../../../containers/resource-providers/ResourceProvidersHeading';
import AddNewModal from '../../../containers/resource-providers/AddNewModal';
import useMousetrap from '../../../hooks/use-mousetrap';
import { DeleteProviderModal } from '../../../containers/resource-providers/DeleteProviderModal';
import ProviderListing from '../../../containers/resource-providers/ProviderListing';
import AddNewCompanyModal from '../../../containers/resource-providers/AddNewCompany';
import { companies_Dummy } from '../../../data/companies';
import apiProviders from '../../../services/api/provider';
import urls from '../../../services/api/urls';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${servicePath}/cakes/paging`;

const orderOptions = [
  { column: 'title', label: 'Author Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const CompaniesListPage = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [companiesLoading, setcompaniesLoading] = useState(false);

  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  // delete author related
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      apiProviders
        .getAll({
          startRow: (currentPage - 1) * selectedPageSize,
          size: selectedPageSize,
          legal_name: search,
          type: 'COMPANY',
        })
        .then((res) => {
          if (res.success) {
            let newCompanies = res.data.providers;
            newCompanies = newCompanies.map((company) => {
              company.avatarUrl = urls.MAIN_URL + company.avatar_url;
              return company;
            });

            setcompanies(newCompanies);
            setTotalPage(1);
            setSelectedItems([]);
            setTotalItemCount(newCompanies.length);
            setIsLoaded(true);
            setTotalPage(
              Math.ceil(res.data.total_providers / selectedPageSize)
            );
          }
        })
        .finally(() => {
          setcompaniesLoading(false);
        });
    }
    if (!companiesLoading) {
      setcompaniesLoading(true);
      fetchData();
    }
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...companies];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= companies.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(companies.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    if (data.action == 'delete') {
      setDeleteModalOpen(true);
    }
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    console.log(data);
    // setauthorToDelete(data);
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const handlecompanyDelete = () => {
    console.log('deleting', selectedItems);
  };

  const onNewCompanyAdded = (payload) => {
    console.log('Adding new company', payload);
    const newCompanies = [payload, ...companies];
    setcompanies(newCompanies);
    setModalOpen(false);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const deletablecompaniesName = companies
    .filter((item) => selectedItems.includes(item.id))
    .map((item) => item.legal_name);
  console.log('s0', deletablecompaniesName);
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ResourceProvidersHeading
          heading="menu.companies"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
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
          itemsLength={companies ? companies.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          handleDelteSelections={() => setDeleteModalOpen(true)}
        />
        <AddNewCompanyModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
          handleSubmit={onNewCompanyAdded}
        />

        <DeleteProviderModal
          modalOpen={deleteModalOpen}
          toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
          onComfirm={handlecompanyDelete}
          providersName={deletablecompaniesName}
        />

        <ProviderListing
          providers={companies}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
          providerType="company"
        />
      </div>
    </>
  );
};

export default CompaniesListPage;
