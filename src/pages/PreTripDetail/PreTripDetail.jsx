import styles from './PreTripDetail.module.css';
import PackageInformation from './PackageInformation/PackageInformation';
import AirplaneInformation from './AirplaneInformation/AirplaneInformation';
import Schedule from './ScheduleInformation/ScheduleInformation';
import PreTripComment from './PreTripComment/PreTripComment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PreTripDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/pre-trip/${id}`);
        setData(response.data);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { productDetail, reviews } = data;
  const { airline, detailCourse, ...packageData } = productDetail;

  return (
    <div className={`${styles.PreTripDetail} layout`}>
      <PackageInformation {...packageData} />
      {reviews.length > 0 && (
        <div className={styles.preTripDetail_review_box}>
          <PreTripComment reviews={reviews} />
        </div>
      )}
      <div className={styles.preTripDetail_review_box}>
        <PreTripComment reviews={reviews} />
      </div>
      <div className={styles.preTripDetail_box}>
        <AirplaneInformation {...airline} />
        <Schedule detailCourse={detailCourse} />
      </div>
    </div>
  );
};

export default PreTripDetail;
