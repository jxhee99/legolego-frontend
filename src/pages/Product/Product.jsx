import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import Metas from '../../components/common/Metas';
import ProductProcessCard from '../../components/Card/ProductProcessCard/ProductProcessCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import apiClient from '../../api/apiClient';
import Search from './Filter/Search';
import styles from './Product.module.css';
import FilterButtons from './FilterButtons/FilterButtons';
import RecruitmentClose from './Filter/RecuritmentClose';
import RecruitmentConfirmed from './Filter/RecruitmentConfirmed';
import SortByDeadlineDesc from './Filter/SortByDeadlineDesc';
import SortByPopular from './Filter/SortByPopular';
import SortByPriceDesc from './Filter/SortByPriceDesc';
import SortByPriceAsc from './Filter/SortByPriceAsc';

const Product = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get('filter');
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    const getLatestProducts = async () => {
      try {
        const response = await apiClient.get('/products/sortByRegDateDesc');
        setLatestProducts(response.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    getProducts();
    getLatestProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <>
      <Metas title="패키지 상품" />
      <section className={`${styles.product} layout`}>
        <Slider {...settings}>
          {products.map((product) => (
            <ProductProcessCard
              key={`product-${product.productNum}`}
              {...product}
            />
          ))}
        </Slider>

        <div className={styles.latestUpdate}>
          <h3>최신 등록된 패키지</h3>
          <ul className={styles.product_cards}>
            {latestProducts.map((product) => (
              <li key={`product-${product.productNum}`}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        </div>

        <FilterButtons />
        {filter === 'search' && <Search />}
        {filter === 'recruitmentClose' && <RecruitmentClose />}
        {filter === 'sortByDeadlineDesc' && <SortByDeadlineDesc />}
        {filter === 'recruitconfirmed' && <RecruitmentConfirmed />}
        {filter === 'sortByPopular' && <SortByPopular />}
        {filter === 'sortByPriceDesc' && <SortByPriceDesc />}
        {filter === 'sortByPriceAsc' && <SortByPriceAsc />}
      </section>
    </>
  );
};

export default Product;
