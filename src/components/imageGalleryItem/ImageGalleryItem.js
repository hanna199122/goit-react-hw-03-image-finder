import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
// import Modal from 'components/modal';

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  getLargeIm,
  largeImageURL,
  getLargeImg,
}) => {
  return (
    <li key={id} className={css['gallery-item']}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => getLargeImg(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
