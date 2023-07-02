import { Component } from 'react';

import { fetchImages } from 'services';
import { Loader } from 'components/Loader';
import { Message } from 'components/Message';
import { Modal } from 'components/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton';
import css from './ImageGallery.module.css';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const imagesPerPage = 12;

export class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    status: STATUS.idle,
    errorText: '',
    largeImageModal: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevTopic = prevProps.topic;
    const nextTopic = this.props.topic;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    try {
      if (prevTopic !== nextTopic) {
        this.setState({ page: 1, status: STATUS.pending, images: null });

        const images = await this.getImages(nextTopic);

        this.setState({ images, status: STATUS.fulfilled, errorText: '' });
        this.checkAmountOfImages(images);
      } else if (prevPage !== nextPage && this.state.page !== 1) {
        this.setState({ status: STATUS.pending });

        const newImages = await this.getImages(nextTopic, nextPage);

        this.setState(({ images }) => ({
          images: [...images, ...newImages],
          status: STATUS.fulfilled,
          errorText: '',
        }));
        this.checkAmountOfImages(newImages);
        this.scrollAfterLoading();
      }
    } catch (e) {
      this.setState({ status: STATUS.rejected, errorText: e.message });
    }

    const prevImages = prevState.images;
    const nextImages = this.state.images;

    if (prevImages && nextImages && nextImages.length > prevImages.length) {
      this.scrollAfterLoading();
    }
  }

  galleryMarkup = () => {
    const { images, largeImageModal } = this.state;

    return (
      <>
        {images && (
          <ul id="gallery" className={css.ImageGallery}>
            {this.state.images.map(
              ({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  onClick={this.showLargeImage}
                  key={id}
                  alt={tags}
                  smallImage={webformatURL}
                  largeImage={largeImageURL}
                />
              )
            )}
          </ul>
        )}
        {largeImageModal && (
          <Modal
            onClose={this.closeModal}
            url={largeImageModal.url}
            alt={largeImageModal.alt}
          />
        )}
      </>
    );
  };

  checkAmountOfImages = images => {
    if (images.length < imagesPerPage) {
      this.setState({ errorText: 'No more images' });
    }
  };

  icrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  getImages = async (topic, page) => {
    return (await fetchImages({ topic, page })).data.hits;
  };

  scrollAfterLoading = () => {
    const { height: cardHeight } = document
      .querySelector('#gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  showLargeImage = (largeUrl, alt) => {
    this.setState({ largeImageModal: { url: largeUrl, alt } });
  };

  closeModal = () => {
    this.setState({ largeImageModal: null });
  };

  render() {
    const { status, errorText } = this.state;
    const markup = this.galleryMarkup();

    if (status === STATUS.fulfilled) {
      return (
        <>
          {markup}
          {!errorText ? (
            <LoadMoreButton onClick={this.icrementPage} />
          ) : (
            <Message>{errorText}</Message>
          )}
        </>
      );
    } else if (status === STATUS.rejected) {
      return (
        <>
          {markup}
          <Message>{errorText}</Message>
        </>
      );
    } else if (status === STATUS.pending) {
      return (
        <>
          {markup}
          <Loader />
        </>
      );
    }
  }
}