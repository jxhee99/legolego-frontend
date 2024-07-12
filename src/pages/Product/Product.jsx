import { useEffect, useState, useMemo } from 'react';
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
  const [productData, setProductData] = useState({
    products: [],
    latestProducts: [],
    recruitmentCloseProduct: [],
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [
          productsResponse,
          recruitmentCloseProductResponse,
          latestProductsResponse,
        ] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/products/recruitmentClose'),
          apiClient.get('/products/sortByRegDateDesc'),
        ]);
        setProductData({
          products: productsResponse.data,
          recruitmentCloseProduct: recruitmentCloseProductResponse.data,
          latestProducts: latestProductsResponse.data,
        });
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      }
    };

    fetchProductData();
  }, [location.search]);

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
    }),
    []
  );

  const renderProductSlider = useMemo(() => {
    const { recruitmentCloseProduct } = productData;
    if (recruitmentCloseProduct.length === 0) return null;

    if (recruitmentCloseProduct.length === 1) {
      return (
        <ProductProcessCard
          key={recruitmentCloseProduct[0].product.productNum}
          productData={recruitmentCloseProduct[0]}
        />
      );
    }

    return (
      <>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
          모집임박한 패키지
        </h2>
        <Slider {...settings}>
          {recruitmentCloseProduct.map((product) => (
            <ProductProcessCard
              key={`product-${product.product.productNum}`}
              productData={product}
            />
          ))}
        </Slider>
      </>
    );
  }, [productData.recruitmentCloseProduct, settings]);

  const renderFilteredContent = () => {
    switch (filter) {
      case 'recruitmentClose':
        return <ProductList endpoint="/products/recruitmentClose" />;
      case 'sortByDeadlineDesc':
        return <ProductList endpoint="/products/sortByDeadlineDesc" />;
      case 'recruitconfirmed':
        return <ProductList endpoint="/products/recruitmentConfirmed" />;
      case 'sortByPopular':
        return <ProductList endpoint="/products/sortByPopular" />;
      case 'sortByPriceDesc':
        return <ProductList endpoint="/products/sortByPriceDesc" />;
      case 'sortByPriceAsc':
        return <ProductList endpoint="/products/sortByPriceAsc" />;
      default:
        return <Search />;
    }
  };

  return (
    <>
      <Metas title="패키지 상품" />
      <section className={`${styles.Product} layout`}>
        {renderProductSlider}

        <div className={styles.latestUpdate}>
          <h2>최신 등록된 패키지</h2>
          <ul className={styles.product_cards}>
            {productData.latestProducts.slice(0, 7).map((product) => (
              <li key={`product-${product.productNum}`}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.filter}>
          <FilterButtons />
          {renderFilteredContent()}
        </div>
      </section>
    </>
  );
};

export default Product;
