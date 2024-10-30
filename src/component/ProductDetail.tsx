import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/productDetail.css'
import axios from "axios";
import {useShoppingContext} from "../contexts/ShoppingContext";
import productData from "../product.json";

interface Product {
    discount?: string;
    imageUrl: string;
    rating: string;
    reviews: string;
    originalPrice?: number;
    id: string;
    name: string;
    price: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    screen: string;
    refreshRate: string;
}

const ProductDetail = () => {

    const {addCartItem} = useShoppingContext();

    const { id } = useParams<{ id: string }>(); // Lấy id từ URL
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const res = await fetch('../products.json');
    //             const data = await res.json();
    //             const foundProduct = data.find((prod: Product) => prod.id === id);
    //             setProduct(foundProduct || null);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchProducts();
    // }, [id]);

    useEffect(() => {
        console.log("get products data from json file");

        // Tìm sản phẩm theo id
        const selectedProduct = productData.products.find(products => products.id === id);

        console.log(selectedProduct);
        setLoading(false);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            const productItem = {
                id: product.id,
                name: product.name,
                price: Number(product.price), // Chuyển đổi giá thành số
                imgUrl: product.imageUrl,
            };
            addCartItem(productItem); // Gọi hàm addCartItem với sản phẩm
        }
    };

    const formattedPrice = product?.price?Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }):'';
    const formattedOriginalPrice = product?.originalPrice ? product.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="productDetail">
            <div className="product-main">
                <div className="profile-product d-flex flex-wrap" key={product.id}>
                    <div className="prd-galery col-lg-5 col-md-12 col-12">
                        <div className="img-prd">
                            <img src={product.imageUrl}
                                 alt={product.name}/>
                        </div>
                    </div>
                    <div className="prd-info col-lg-7 col-md-12 col-12">
                        <div className="info-wrapper">
                            <div className="content">
                                <div className="info-top">
                                    <h1>{product.name}</h1>
                                    <div className="vote_txt">
                                        <div className="vote">
                                            <b>{product.rating}</b>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <a href="/" target="_blank">
                                            Xem đánh giá
                                        </a>
                                    </div>
                                </div>
                                <div className="info-bottom">
                                    <div className="prd-price">
                                        <span className="price">{formattedPrice}</span>
                                        <del>{formattedOriginalPrice}</del>
                                        <span className="percent">{product.discount}</span>
                                    </div>
                                    <div className="prd-actions">
                                        <div className="action-buys">
                                            <a href="#" className="btn-buy" id="btn-buy" onClick={() => handleAddToCart()}>
                                                <span>Mua ngay</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="prd-gift-sp">
                                        <p><span
                                            style={{color: "#ff0000"}}><strong>ƯU ĐÃI KHI MUA KÈM PC</strong></span>
                                        </p>
                                        <p><span>
                                    <i className="bi bi-star-fill"></i>
                                    <a href="/" target="_blank">
                                        <strong>Ưu đãi lên đến 54% khi mua kèm PC</strong>
                                         xem ngay tại đây
                                    </a>
                                </span></p>
                                        <hr/>
                                        <p><span style={{color: "#ff0000"}}><strong>Hỗ trợ trả góp MPOS (Thẻ tín dụng), HDSAISON.</strong></span>
                                        </p>
                                        <p><span><em>(Hình ảnh PC chỉ mang tính chất minh họa).</em></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
