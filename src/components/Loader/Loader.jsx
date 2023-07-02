import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <RotatingLines
        height="40"
        width="40"
        strokeColor="#3f51b5"
        ariaLabel="loading"
      />
    </div>
  );
};
