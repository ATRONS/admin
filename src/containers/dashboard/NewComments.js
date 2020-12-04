/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';

import Rating from '../../components/common/Rating';
import { adminRoot } from '../../constants/defaultValues';
import { comments as dummy_commnets } from '../../data/comments';
import { CustomSpinner } from '../../components/common/CustomSpinner';

const NewComments = ({ className = '', displayRate = false, fetchData }) => {
  const [comments, setComments] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageIndex, setpageIndex] = useState(0);

  const fetchComments = async () => {
    let loadingIndicator;
    try {
      loadingIndicator = pageIndex == 0 ? setLoading : setLoadingMore;
      loadingIndicator(true);
      const newComments = await fetchData(pageIndex);
      console.log('way', newComments);
      setComments([...comments, ...newComments]);
    } catch (error) {
    } finally {
      if (loadingIndicator) loadingIndicator(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [pageIndex]);

  let mainContent = <CustomSpinner />;
  if (!loading) {
    if (Array.isArray(comments)) {
      mainContent = (
        <div>
          {comments.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex flex-row mb-3 pb-3 border-bottom"
              >
                <img
                  src="/assets/img/profiles/l-2.jpg"
                  alt={item.title}
                  className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                />

                <div className="pl-3 pr-2">
                  <p className="font-weight-medium mb-0">{item.reviewerName}</p>
                  <p className="text-muted mb-0 text-small">{item.content}</p>
                  {displayRate && (
                    <div className="form-group mb-1 mt-2">
                      <Rating
                        total={5}
                        rating={item.rating}
                        interactive={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {hasMore && (
            <div>
              <Button
                color="primary"
                type="submit"
                className={` mt-3 btn-multiple-state  ${classnames({
                  'show-spinner': loadingMore,
                })}`}
                disabled={loadingMore}
                onClick={() => {
                  setpageIndex(pageIndex + 1);
                }}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Load more</span>
              </Button>
            </div>
          )}
        </div>
      );
    }
  }
  return (
    <Card className={className}>
      <CardBody>
        <CardTitle>
          <IntlMessages id="pages.comments" />
        </CardTitle>
        {mainContent}
      </CardBody>
    </Card>
  );
};

export default NewComments;
