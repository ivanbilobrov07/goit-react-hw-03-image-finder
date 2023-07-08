import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGalleryList.module.css';

export const ImageGalleryList = ({ images, showLargeImage }) => {
  return (
    images && (
      <ul id="gallery" className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            onClick={showLargeImage}
            key={id}
            alt={tags}
            smallImage={webformatURL}
            largeImage={largeImageURL}
          />
        ))}
      </ul>
    )
  );
};
