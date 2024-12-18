import React, { useEffect, useState } from 'react';
import '../style/header.css';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { CartItem } from "./CartItem";


interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
}

export default function Header() {
    const [products, setProducts] = useState<Product[]>([]);
    const { cartItems, cartQty, totalPrice } = useShoppingContext();

    useEffect(() => {
        console.log("get products data from api");

        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/products');
                console.log("product => ", res);
                setProducts(res.data);
            } catch (error) {
                console.log("error => ", error);
            }
        };
        fetchProducts();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Xử lý khi người dùng nhập từ khóa
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setDropdownVisible(e.target.value.length > 0); // Chỉ hiển thị dropdown khi có từ khóa
    };

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <header>
            <div className="header_top">
                <div className="container">
                    <div className="row-header">
                        <div className="left-header">
                            <a href="/" className="header_logo">
                                <img src="https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg" />
                            </a>
                            <div className="header-item menu">
                                <div className="header-text">
                                    <a href="/" className="header_link">
                                        <span className="box-icon">
                                            <i className="bi bi-list"></i>
                                        </span>
                                        <span className="box-text">Danh mục</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="right-header">
                            <div className="header-item search">
                                <div className="search-box">
                                    <form action="/search" className="search_product" id="search_product">
                                        <div className="search-inner">
                                            <input type="hidden" name="tyle" value="product" />
                                            <input
                                                required
                                                id="inputSearchAuto"
                                                className="inputSearch"
                                                maxLength={40}
                                                autoComplete="off"
                                                type="text"
                                                size={20}
                                                placeholder="Bạn cần tìm gì?"
                                                value={searchTerm}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn-search" id="btn-search">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </form>

                                    {/* Hiển thị dropdown khi có từ khóa tìm kiếm */}
                                    {isDropdownVisible && (
                                        <div className="search-dropdown">
                                            <div className="resultsContent">
                                                {filteredProducts.map((product) => (
                                                    <div key={product.id} className="item-ult">
                                                        <div className="title">
                                                            <a href="/" title={product.name}>
                                                                {product.name}
                                                            </a>
                                                            <p>
                                                                <span>{Number(product.price).toLocaleString('vi-VN')}đ</span>
                                                                <del>{Number(product.originalPrice).toLocaleString('vi-VN')}đ</del>
                                                            </p>
                                                        </div>
                                                        <div className="thumbs">
                                                            <a href="/" title={product.name}>
                                                                <img alt={product.name} src={product.imageUrl} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Hiển thị liên kết "Xem thêm sản phẩm" nếu có nhiều hơn 6 sản phẩm */}
                                                {filteredProducts.length > 6 && (
                                                    <div className="view-more">
                                                        <a href="/search">Xem thêm sản phẩm...</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="header-item hotline">
                                <div className="header-text">
                                    <a className="header_link" href="tel:0708811203" title="Hotline" aria-label="hotline">
                                        <span className="box-icon">
                                            <i className="bi bi-headset"></i>
                                        </span>
                                        <span className="box-text">
                                            Hotline <br /> 0708811203
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="header-item showroom">
                                <div className="header-text">
                                    <a className="header_link" href="/" title="hệ thống Showroom"
                                       aria-label="hệ thống Showroom">
                                        <span className="box-icon">
                                            <i className="bi bi-geo-alt"></i>
                                        </span>
                                        <span className="box-text">
                                            Hệ thống <br /> Showroom
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="header-item ordertracking">
                                <div className="header-text">
                                    <a className="header_link" href="/OrderTracking" title="Tra cứu đơn hàng"
                                       aria-label="Tra cứu đơn hàng">
                                        <span className="box-icon">
                                            <i className="bi bi-clipboard2-data"></i>
                                        </span>
                                        <span className="box-text">
                                            Tra cứu <br /> đơn hàng
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="header-item cart">
                                <div className="header-text">
                                    <Link className="header_link" to="/cart" title="Giỏ hàng" aria-label="Giỏ hàng">
                                        <span className="box-icon">
                                            <i className="bi bi-cart"></i>
                                            <span className="count-holder">
                                                <span className="count">{cartQty}</span>
                                            </span>
                                        </span>
                                        <span className="box-text">
                                            Giỏ <br /> hàng
                                        </span>
                                    </Link>

                                </div>
                                <div className="dropdown-cart">
                                    <div className="your-cart">
                                        <div className="cart-title">
                                            <h3>Your Cart</h3>
                                        </div>
                                        <div className="cart-content">
                                            {cartItems.length === 0 ? (
                                                <div>
                                                    <span>Làm gì có món hàng nào mà coi, hãy mua hàng đi.</span>
                                                </div>
                                            ) : (
                                                cartItems.slice(0, 1000000000000000000000).map(item => {
                                                    return <CartItem key={item.id} {...item} />;
                                                })
                                            )}
                                        </div>
                                        <div className="cart-total">
                                            <span>Total: {Number(totalPrice).toLocaleString('vi-VN')}đ</span>
                                            <Link to="/checkout" className="btn-pay">Thanh toán</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="header-item account">
                                <div className="header-text">
                                    <a className="header_link" href="/" title="Tài khoản" aria-label="Tài khoản">
                                        <span className="box-icon">
                                            <i className="bi bi-person"></i>
                                        </span>
                                        <span className="box-text">
                                            Đăng <br /> nhập
                                        </span>
                                    </a>
                                </div>

                                <div className="header-dropdown">
                                    <div className="box-account">
                                        <p>
                                            <span><i className="bi bi-person-raised-hand"></i></span>
                                            <span>Xin chào, vui lòng đăng nhập</span>
                                        </p>
                                        <div className="btn-login-register">
                                            <button className="btn-account">Đăng nhập</button>
                                            <button className="btn-account">Đăng ký</button>
                                        </div>
                                        <p>
                                            <span><i className="bi bi-question-circle"></i></span>
                                            <a href="/">Trợ giúp</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
