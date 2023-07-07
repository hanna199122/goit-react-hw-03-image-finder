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
    isLoading: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.picturesName !== prevState.picturesName ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });

      API.fetchPictures(this.state.picturesName, this.state.page)
        .then(picture => {
          if (picture.hits.length === 0) {
            return toast.error(
              `Немає такої картинки ${this.state.picturesName}`,
              {
                theme: 'colored',
              }
            );
          } else {
            this.setState(prevState => {
              return {
                pictures: [...prevState.pictures, ...picture.hits],
              };
            });
          }
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  showMorePictures = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleFormSubmit = picturesName => {
    this.setState({ picturesName });
  };

  getLargeImg = largeImageURL => {
    this.setState({ largeImageURL });
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    const { showModal, page, pictures, isLoading, largeImageURL } = this.state;

    return (
      <div className={css['app-container']}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div className="container">
          <ImageGallery
            showModal={this.toggleModal}
            pictures={pictures}
            isLoading={isLoading}
            getLargeImg={this.getLargeImg}
          />
          {isLoading ||
            (pictures.length >= 12 && (
              <Button
                page={page}
                showMorePictures={this.showMorePictures}
              ></Button>
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
