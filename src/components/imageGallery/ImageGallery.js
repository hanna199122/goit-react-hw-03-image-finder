import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { showModal, pictures, loading } = this.props;

    return (
      <>
        {loading ? (
          <ThreeDots />
        ) : (
          <ul className={css.imageGalleryList} onClick={showModal}>
            {pictures.map(picture => {
              return <ImageGalleryItem picture={picture} key={picture.id} />;
            })}
          </ul>
        )}
      </>
    );
  }
}

export default ImageGallery;
