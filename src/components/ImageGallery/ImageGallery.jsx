import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGallertItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  openModal = imgURL => {
    this.props.onClick(imgURL);
  };

  render() {
    return (
      <ul className={css.gallery}>
        {this.props.data.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            smallImg={image.webformatURL}
            bigImg={image.largeImageURL}
            tags={image.tags}
            onClick={this.openModal}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
};
