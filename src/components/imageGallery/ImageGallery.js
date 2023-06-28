import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem';

// 'idle', 'pending', 'rejected', 'resolved';

class ImageGallery extends Component {
  state = {
    pictures: [],
    loading: false,
    error: null,

    // status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.picturesName;
    const nextName = this.props.picturesName;

    if (prevName !== nextName) {
      const BASE_API = 'https://pixabay.com/api/';
      const API_KEY = '36122923-4c7f71e9d9d6e85a0cc171286';

      this.setState({ loading: true, pictures: [] });
      fetch(
        `${BASE_API}?key=${API_KEY}&q=${nextName}&page=1&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              toast.error(`Немає такої картинки ${nextName}`, {
                theme: 'colored',
              })
            )
          );
        })
        .then(picture => this.setState({ pictures: [...picture.hits] }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { pictures, loading } = this.state;
    const { showModal } = this.props;

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

// pictures.largeImageURL

export default ImageGallery;
