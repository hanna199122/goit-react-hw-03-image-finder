import css from './Button.module.css';

const Button = ({ page, showMorePictures }) => {
  return (
    <button className={css.button} onClick={showMorePictures}>
      Load more
    </button>
  );
};

export default Button;
