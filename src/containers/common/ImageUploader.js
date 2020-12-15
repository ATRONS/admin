/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import urls from '../../services/api/urls';
import { getUserToken } from '../../helpers/Utils';

const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
  postUrl: urls.uploadImages,
};
const dropzoneConfig = (onChange) => ({
  thumbnailHeight: 160,
  maxFilesize: 3,
  paramName: 'image',
  acceptedFiles: 'image/jpeg, image/png',
  success: (data, response) => {
    console.log(response);
    if (response.success) {
      onChange(response.data);
    }
  },
  // complete: (data) => {
  //   console.log('comp', data.upload);
  //   onChange(data);
  // },
  // removedfile: () => {
  //   // onChange({});
  //   return true;
  // },
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <>
      <div className="dz-preview dz-image-preview mb-3 position-relative">
        <div className="d-flex flex-row ">
          <div className="p-0 w-100 position-relative">
            <div className="dz-error-mark">
              <span>
                <i />{' '}
              </span>
            </div>
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          {' '}
          <i className="glyph-icon simple-icon-trash" />{' '}
        </a>
      </div>
      <div className="dz-progress">
        <span className="dz-upload" data-dz-uploadprogress />
      </div>
    </>
  ),
  headers: { Authorization: getUserToken() },
});

export default class ImageUploader extends Component {
  clear() {
    this.myDropzone.removeAllFiles(true);
  }

  render() {
    const config = dropzoneConfig((data) =>
      this.props.onChange(this.props.name, data)
    );
    return (
      <DropzoneComponent
        className="profile-pic mb-3"
        config={dropzoneComponentConfig}
        djsConfig={config}
        eventHandlers={{
          init: (dropzone) => {
            this.myDropzone = dropzone;
          },
        }}
      />
    );
  }
}
