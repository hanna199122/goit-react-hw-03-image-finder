import css from './Button.module.css';

const Button = ({ page }) => {
  function handleNextPage() {
    return (page += 1);
  }
  return (
    <button
      className={css.button}
      onClick={() => console.log(handleNextPage())}
    >
      Load more
    </button>
  );
};

export default Button;
