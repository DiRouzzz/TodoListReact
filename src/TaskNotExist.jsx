import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const TaskNotExist = () => {
  return (
    <div className={styles.container}>
      <h1>😕 Задача не найдена</h1>
      <p>Возможно, она была удалена или вы ввели неверный адрес.</p>
      <Link to="/" className={styles.backHome}>
        ⬅️ Вернуться на главную
      </Link>
    </div>
  );
};
