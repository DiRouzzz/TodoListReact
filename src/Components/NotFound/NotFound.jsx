import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 — Страница не найдена</h1>
      <p>Похоже, вы попали не туда 😕</p>
      <Link to="/" className={styles.backHome}>
        ⬅️ Вернуться на главную
      </Link>
    </div>
  );
};
