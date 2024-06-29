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
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/products/${productNum}`, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                }); // 백에서 상품 상세 정보 가져오기
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
    const onClickBuy = async () => {
        const totalPrice = count * product.price;
        
        try {
            const token = localStorage.getItem('token');
            if(!token) {
                console.error("토큰을 찾을 수 없습니다.");
                return;
            }
            console.log("토큰 발급 : ", token);

            const orderResponse = await axios.post('/api/user/orders', {
                productNum : product.productNum,
                quantity : count,
                totalPrice : totalPrice
            }, {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`,
                },
                // withCredentials: true
            });
            if(orderResponse.status === 201) {
                // const { orderNumber } = orderResponse.data;
                const orderData = orderResponse.data;
                const merchantUid = orderData.orderNumber;
                console.log("주문 생성 성공 - Merchant UID: " + merchantUid);
                navigate('/payment', { state: { product, count, totalPrice, orderData, merchantUid} });
            } else {
                console.error('주문 생성 실패 :', orderResponse.status);
            }
        } catch (error) {
            console.error("에러 발생 :", error);
        }
    };

    if(loading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>
 
    return (
        <div className={styles.container}>
            <h1>주문 정보</h1>
            <hr className={styles.hr1}/>
            <div className={styles.partner_name}>✈️ {product.partnerName}</div>
            <hr className={styles.hr2}/>
            <div className={styles.order_box}>
                <div className={styles.order_info}>
                    <h3>{product.productName}</h3>
                    <p className={styles.price}>가격 : {product.price.toLocaleString()}원</p>
                    <div className={styles.quantity}>
                        <button className={styles.quantity_btn} onClick={onClickMinus}>-</button>
                        <span className={styles.quantity_span}>{count}</span>
                        <button className={styles.quantity_btn} onClick={onClickPlus}>+</button>
                    </div>
                    <span className={styles.total_price}>결제금액 : {(count * product.price).toLocaleString()}<span className={styles.total_unit}>원</span>
                    </span>
                </div>
                <div className={styles.order_img}>
                    <img src={product.productImage} alt="" />
                </div> 
            </div>
            <button className={styles.buy_btn} onClick={onClickBuy}>BUY NOW</button>
            <hr className={styles.hr2}/>
        </div>
    );

};

export default Order
