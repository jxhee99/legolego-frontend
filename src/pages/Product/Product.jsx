import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import Metas from '../../components/common/Metas';
import ProductProcessCard from '../../components/Card/ProductProcessCard/ProductProcessCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import apiClient from '../../api/apiClient';
import Search from './Search';
import styles from './Product.module.css';
import FilterButtons from './FilterButtons/FilterButtons';
import ProductList from './ProductList';

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
      <section className={`${styles.Product} layout`}>
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
            {latestProducts.slice(0, 3).map((product) => (
              <li key={`product-${product.productNum}`}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.filter}>
          <FilterButtons />
          {filter ? <></> : <Search />}
          {filter === 'recruitmentClose' && (
            <ProductList endpoint="/products/recruitmentClose" />
          )}
          {filter === 'sortByDeadlineDesc' && (
            <ProductList endpoint="/products/sortByDeadlineDesc" />
          )}
          {filter === 'recruitconfirmed' && (
            <ProductList endpoint="/products/recruitmentConfirmed" />
          )}
          {filter === 'sortByPopular' && (
            <ProductList endpoint="/products/sortByPopular" />
          )}
          {filter === 'sortByPriceDesc' && (
            <ProductList endpoint="/products/sortByPriceDesc" />
          )}
          {filter === 'sortByPriceAsc' && (
            <ProductList endpoint="/products/sortByPriceAsc" />
          )}
        </div>
      </section>
    </>
  );
};

export default Product;
