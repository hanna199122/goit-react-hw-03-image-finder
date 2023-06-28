import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/searchbar';
import css from './App.module.css';
import ImageGallery from 'components/imageGallery';
import Modal from 'components/modal';
import Button from 'components/button';

class App extends Component {
  state = {
    picturesName: '',
    showModal: false,
    page: 1,
  };

  handleFormSubmit = picturesName => {
    this.setState({ picturesName });
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    const { showModal, page } = this.state;

    return (
      <div className={css['app-container']}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div className="container">
          <ImageGallery
            showModal={this.toggleModal}
            picturesName={this.state.picturesName}
          />
          <Button page={page} />
        </div>
        {showModal && (
          <Modal showModal={this.toggleModal}>
            {/* <img src={webformatURL} alt={tags} /> */}
          </Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
export default App;
