import styles from './ListTable.module.css';

const ListTable = ({ title, children }) => {
  return (
    <div className={styles.list_box}>
      <h3>{title}</h3>
      <table>{children}</table>
    </div>
  );
};

export default ListTable;
