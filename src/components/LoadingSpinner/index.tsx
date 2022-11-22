import styles from './styles.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.ldsRoller} role="progressbar">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
export default LoadingSpinner;
