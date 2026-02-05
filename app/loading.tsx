import css from "./loading.module.css";

const Loading = () => {
  return (
    <div className={css.loaderWrapper}>
      <svg viewBox="25 25 50 50" className={css.svg}>
        <circle r="20" cy="50" cx="50" className={css.circle}></circle>
      </svg>
    </div>
  );
};

export default Loading;
