import React from 'react';
import { Badge } from 'reactstrap';
import Rating from '../../components/common/Rating';
import IntlMessages from '../../helpers/IntlMessages';

const _formatDate = (isoString) => {
  return isoString.split('T')[0];
};

const BasicDetailsPane = ({ details, type }) => {
  if (type === 'author') {
    return (
      <>
        <p className="text-muted text-small mb-2">
          <IntlMessages id="menu.about" />
        </p>
        <p className="mb-3">{details.bio}</p>
        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.email" />
        </p>
        <p className="mb-3">{details.email}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.phoneNumber" />
        </p>
        <p className="mb-3">{details.phone}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.activeFrom" />
        </p>
        <p className="mb-3">{details.author_info.active_from}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.birthDate" />
        </p>
        <p className="mb-3">{_formatDate(details.author_info.dob)}</p>
      </>
    );
  } else if (type === 'company') {
    return (
      <>
        <p className="text-muted text-small mb-2">
          <IntlMessages id="menu.about" />
        </p>
        <p className="mb-3">{details.about}</p>
        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.location" />
        </p>
        <p className="mb-3">{details.company_info.hq_address}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.phoneNumber" />
        </p>
        <p className="mb-3">{details.phone}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.foundOn" />
        </p>
        <p className="mb-3">{_formatDate(details.company_info.founded_date)}</p>
      </>
    );
  } else if (type === 'book') {
    return (
      <>
        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.sub-title" />
        </p>
        <p className="mb-3">{details.subtitle}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.isbn" />
        </p>
        <p className="mb-3">{details.ISBN}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.rating" />
        </p>
        <div className="mb-3">
          <Rating total={5} rating={details.rating.value} interactive={false} />
        </div>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.selling-price" />
        </p>
        <p className="mb-3">{details.price.selling} ETB</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.renting-price" />
        </p>
        <p className="mb-3">{details.price.rent.value} ETB/hr</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.published-date" />
        </p>
        <p className="mb-3">{_formatDate(details.published_date)}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.uploaded-on" />
        </p>
        <p className="mb-3">{_formatDate(details.published_date)}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="pages.tags" />
        </p>
        <div className="mb-3">
          <p className="d-sm-inline-block mb-1">
            {details.tags.map((tag) => (
              <Badge color="outline-secondary mb-1 mr-1" pill>
                {tag.name}
              </Badge>
            ))}
          </p>
        </div>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.pages" />
        </p>
        <p className="mb-3">{details.pages}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.edition" />
        </p>
        <p className="mb-3">{details.edition}</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.language" />
        </p>
        <p className="mb-3">Amharic</p>

        <p className="text-muted text-small mb-2">
          <IntlMessages id="forms.synopsis" />
        </p>
        <p className="mb-3">{details.synopsis}</p>
      </>
    );
  } else if (type == 'magazine') {
    return <>Magazine details</>;
  } else if (type == 'magazine') {
    return <>Newspaper details</>;
  }
  return <>Unkown type - {type}</>;
};

export default BasicDetailsPane;
