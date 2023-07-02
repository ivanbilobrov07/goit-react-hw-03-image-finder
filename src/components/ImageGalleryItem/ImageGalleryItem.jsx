import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImage, largeImage, onClick, alt }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => onClick(largeImage, alt)}
        className={css['ImageGalleryItem-image']}
        src={smallImage}
        alt={alt}
      />
    </li>
  );
};
