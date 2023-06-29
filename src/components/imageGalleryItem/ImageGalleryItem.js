import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
// import Modal from 'components/modal';

class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, tags } = this.props.picture;

    return (
      <li key={id} className={css['gallery-item']}>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  }
}

export default ImageGalleryItem;
