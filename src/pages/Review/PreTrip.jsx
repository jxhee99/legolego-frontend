import PackageCard from "../../components/Card/PackageCard/PackageCard";
import styles from './PreTrip.module.css';
import { useNavigate } from "react-router-dom";

const PreTrip = () => {
  const navigate = useNavigate();
  const goToPreTripDetail=()=>{
    navigate('/preTrip_detail')};
  return (
    <section className={styles.PreTrip}>
      <h2>지난 여행 후기를 둘러보세요! </h2>
      <div className={styles.preTrip_grid}>
      <div className={styles.preTrip_product} onClick={goToPreTripDetail}>
        <PackageCard 
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
      <div className={styles.preTrip_product}>
        <PackageCard
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
      <div className={styles.preTrip_product}>
        <PackageCard
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
      <div className={styles.preTrip_product}>
        <PackageCard
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
      <div className={styles.preTrip_product}>
        <PackageCard
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
      <div className={styles.preTrip_product}>
        <PackageCard
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
      
      </div>
    </section>
  );
};

export default PreTrip;
