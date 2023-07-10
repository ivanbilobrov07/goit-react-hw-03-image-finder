import { Component } from 'react';

import { Modal } from 'components/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
  };

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({ isModalShown: !isModalShown }));
  };

  render() {
    const { isModalShown } = this.state;
    const { smallImage, largeImage, alt } = this.props;

    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            onClick={this.toggleModal}
            className={css['ImageGalleryItem-image']}
            src={smallImage}
            alt={alt}
          />
        </li>
        {isModalShown && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}
