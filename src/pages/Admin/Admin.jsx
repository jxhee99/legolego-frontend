import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Admin.module.css';
import Logo from '../../components/Logo/Logo';

const date = new Date();
const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const Admin = () => {
  const { role } = useContext(AuthContext);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (role !== 'ADMIN') {
    return <div className={styles.error}>권한이 없습니다.</div>;
  }

  return (
    <div className={styles.Admin}>
      <Logo />
      <p className={styles.date}>{formattedDate}</p>
      <p className={styles.time}>{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default Admin;
