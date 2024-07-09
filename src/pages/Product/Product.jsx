import styles from './Product.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import Metas from '../../components/common/Metas';
import apiClient from '../../api/apiClient';
import SearchField from './SearchField/SearchField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductProcessCard from '../../components/Card/ProductProcessCard/ProductProcessCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Product = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/products');
      setAllProductData(response.data);
      setDisplayedData(response.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = allProductData.filter((productItem) =>
      productItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [itemsPerPage, currentPage, allProductData, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
          {displayedData.map((productItem) => (
            <ProductProcessCard key={productItem.productNum} {...productItem} />
          ))}
        </Slider>
        <div className={styles.latestUpdate}>
          <h2>최신 등록</h2>
          <div className={styles.product_cards}>
            {displayedData.map((productItem) => (
              <ProductCard key={productItem.productNum} {...productItem} />
            ))}
          </div>
        </div>
        <div className={styles.productList}>
          <SearchField onChange={handleSearch} value={searchTerm} />
          <div className={styles.product_cards}>
            {displayedData.map((productItem) => (
              <ProductCard key={productItem.productNum} {...productItem} />
            ))}
          </div>
        </div>
        <Stack spacing={2} className={styles.pagination}>
          <Pagination
            count={Math.ceil(
              allProductData.filter((productItem) =>
                productItem.productName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ).length / itemsPerPage
            )}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </section>
    </>
  );
};

export default Product;
