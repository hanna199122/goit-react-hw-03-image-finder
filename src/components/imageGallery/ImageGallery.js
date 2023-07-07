import { ThreeDots } from 'react-loader-spinner';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem';

const ImageGallery = ({ showModal, pictures, isLoading, getLargeImg }) => {
  return (
    <>
      {isLoading ? (
        <ThreeDots color="#3f51b5" />
      ) : (
        <ul className={css.imageGalleryList} onClick={showModal}>
          {pictures.map(({ id, largeImageURL, tags, webformatURL }) => {
            return (
              <ImageGalleryItem
                id={id}
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                getLargeImg={getLargeImg}
                tags={tags}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;
