import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryStyles.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <ul className={css.gallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            alt={tags}
          ></ImageGalleryItem>
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageGallery;
