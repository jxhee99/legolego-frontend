import styles from './ListTable.module.css';

const ListTable = ({ children }) => {
  return (
    <div className={styles.list_box}>
      <table>{children}</table>
    </div>
  );
};

export default ListTable;
