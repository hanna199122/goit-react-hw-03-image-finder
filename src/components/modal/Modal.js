import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#root-modal');

// console.log(modalRoot);

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('showModal modal');
        this.props.showModal();
      }
    });
  }

  render() {
    const { showModal } = this.props;
    console.log(showModal);

    return createPortal(
      <div className={css.overlay} onClick={showModal}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
