/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../navs/Breadcrumb';
import IntlMessages from '../../helpers/IntlMessages';

import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon,
} from '../../components/svg';
import { NavLink } from 'react-router-dom';

const ResourceProvidersHeading = ({
  intl,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
  handleDelteSelections,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button mr-2  "
              onClick={() => toggleModal()}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem onClick={handleDelteSelections}>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="pages.another-action" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <Breadcrumb match={match} />
        </div>

        <div className="mb-2">
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <div className="d-block d-md-inline-block pt-1">
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={messages['menu.search']}
                  onKeyPress={(e) => onSearchKey(e)}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ResourceProvidersHeading);
