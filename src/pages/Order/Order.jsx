import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Order.module.css';
import axios from 'axios';


const Order = () => {

    const { productNum } = useParams(); // 파라미터에서 productNum 가져오기
    const [product, setProduct] = useState(null); // 상품 정보 저장 상태
    const [count, setCount] = useState(1); // 수량 저장 상태
    // const [totalPrice, setTotalPrice] = useState(product.price);
    const navigate = useNavigate();
    const [loading, setLoding] = useState(true); // 로딩 상태


    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                console.log("Fetching product for productNum:", productNum);
                const response = await axios.get(`/api/products/${productNum}`); // 백에서 상품 상세 정보 가져오기
                if(response.data) {
                    setProduct(response.data);
                    console.log("Product details fetched : ", response.data);
                } else {
                    console.log("응답 데이터가 없습니다.");
                }
                // setProduct(response.data);
                setLoding(false); // 로딩 완료
                // console.log("product details fetched : ", response.data);
            } catch (error) {
                console.error("상품 세부정보를 가져오는 중에 오류 발생 : ", error);
                setLoding(false); // 로딩실패
            }
        };

        fetchProductDetail(); // useEffect 실행 시 상품 상세 정보 가져오기 호출
    }, [productNum]); // productNum이 변경될 때마다 useEffect 재실행

    // 수량 감소 버튼 핸들러
    const onClickMinus = () => {
        if(count > 1) {
            setCount(count -1);
        }
    };

    // 수량 증가 버튼 핸들러
    const onClickPlus = () => {
        setCount(count +1);
    };
    
    // 구매 버튼 핸들러
    const onClickBuy = () => {
        const totalPrice = count * product.price;
        // const userNum = 1; // 올바른 userNum 불러와야함
        const userEmail = 'user1@naver.com'; // 구매자 이메일 불러와야함
        const userName = '김김김'; // 구매자 이름 불러와야함
        const userPhone = '010-2222-2222'; // 구매자 번호 불러와야함
        navigate('/payment', { state: { product, count, totalPrice } });
    };

    if(loading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>
 
    return (
        <>
            <div>
                <h1>{product.partnerName}</h1>
                <h1>{product.productName}</h1>
                <div className={styles.order_img}>
                    <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
                </div>
                {/* {product.price !== undefined && (
                <> */}
                    <p>{product.price.toLocaleString()}원</p>
                    {/* 수량 카운트 */}
                    <div className={styles.quantity}>
                    <button className={styles.quantity_btn} onClick={onClickMinus}>-</button>
                    <span>{count}</span>
                    <button className={styles.quantity_btn} onClick={onClickPlus}>+</button>
                    </div>
                    {/* 총 금액 */}
                    <span className={styles.total_price}>{(count * product.price).toLocaleString()}
                    <span className={styles.total_unit}>원</span>
                    </span>
                    {/* 구매 버튼 */}
                    <button className={styles.buy_btn} onClick={onClickBuy}>BUY NOW</button>
                {/* </>
        )} */}
            </div>
        </>
    );

};

export default Order
