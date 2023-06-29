import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/searchbar';
import css from './App.module.css';
import ImageGallery from 'components/imageGallery';
import Modal from 'components/modal';
import Button from 'components/button';
// import picturesAPI from 'services/pictures-api';

class App extends Component {
  state = {
    picturesName: '',
    showModal: false,
    page: 1,
    pictures: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.picturesName;
    const nextName = this.state.picturesName;

    if (
      prevName !== nextName ||
      this.state.picturesName !== prevState.picturesName
    ) {
      this.setState({ loading: true, pictures: [] });
      const BASE_API = 'https://pixabay.com/api/';
      const API_KEY = '36122923-4c7f71e9d9d6e85a0cc171286';

      fetch(
        `${BASE_API}?key=${API_KEY}&q=${nextName}&${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
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
        // picturesAPI
        //   .fetchPictures(nextName)
        .then(picture => {
          console.log(picture);
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

  handleFormSubmit = picturesName => {
    this.setState({ picturesName });
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    console.log(this.state.pictures);
    const { showModal, page, pictures, loading } = this.state;

    return (
      <div className={css['app-container']}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div className="container">
          <ImageGallery
            showModal={this.toggleModal}
            pictures={pictures}
            loading={loading}
          />
          <Button page={page} />
        </div>
        {showModal && (
          <Modal showModal={this.toggleModal}>
            {/* <img src={largeImageURL} alt={tags} /> */}
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
export default App;
