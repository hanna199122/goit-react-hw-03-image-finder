import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/searchbar';
import css from './App.module.css';
import ImageGallery from 'components/imageGallery';
import Modal from 'components/modal';
import Button from 'components/button';
import API from 'services/pictures-api';

class App extends Component {
  state = {
    picturesName: '',
    showModal: false,
    page: 1,
    pictures: [],
    loading: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.picturesName;
    const nextName = this.state.picturesName;

    if (
      prevName !== nextName ||
      this.state.picturesName !== prevState.picturesName
    ) {
      this.setState({ loading: true, pictures: [] });

      API.fetchPictures(nextName)
        .then(picture => {
          if (picture.hits.length === 0) {
            return toast.error(`Немає такої картинки ${nextName}`, {
              theme: 'colored',
            });
          } else {
            this.setState({ pictures: [...picture.hits] });
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  // async getPictures = pictures => {
  //   const data = await API.fetchPictures()
  //     .then(picture => {
  //       if (picture.hits.length === 0) {
  //         return toast.error(`Немає такої картинки `, {
  //           theme: 'colored',
  //         });
  //       } else {
  //         this.setState({ pictures: [...picture.hits] });
  //       }
  //     })
  //     .catch(error => this.setState({ error }))
  //     .finally(() => this.setState({ loading: false }));
  //   console.log(data);
  // };

  handleFormSubmit = picturesName => {
    this.setState({ picturesName });
  };

  getLargeImg = largeImageURL => {
    this.setState({ largeImageURL });
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  showMore = pictures => {
    const picturesCollection = API.fetchPictures();
    console.log(picturesCollection);
    this.setState(state => ({
      pictures: [...state.pictures, picturesCollection],
    }));
  };

  render() {
    console.log(this.state.pictures);
    const { showModal, page, pictures, loading, largeImageURL } = this.state;

    return (
      <div className={css['app-container']}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div className="container">
          <ImageGallery
            showModal={this.toggleModal}
            pictures={pictures}
            loading={loading}
            getLargeImg={this.getLargeImg}
          />
          {loading ||
            (pictures.length !== 0 && (
              <Button page={page} addPictures={this.showMore} />
            ))}
        </div>
        {showModal && (
          <Modal showModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
export default App;
