import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallerItem.module.css';

export class ImageGalleryItem extends Component {
  handleImgClick = imgURL => {
    imgURL = this.props.bigImg;
    this.props.onClick(imgURL);
  };

  render() {
    return (
      <li className={css.galleryItem} onClick={this.handleImgClick}>
        <img
          className={css.image}
          src={this.props.smallImg}
          modalimg={this.props.bigImg}
          alt={this.props.tags}
          loading="lazy"
        />
      </li>
    );
  }
}

ImageGalleryItem.defaultProps = {
  smallImg: '#',
  bigImg: '#',
  tags: 'some image',
  id: Math.random(),
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
