import React, { useEffect, useState } from 'react';
import '../style/OrderTracking.css';  // Đảm bảo rằng tên file CSS chính xác

interface OrderItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    imgUrl: string;
}

interface OrderDetails {
    orderCode: string;
    name: string;
    phone: string;
    address: string;
    gender: string;
    totalPrice: number;
    items: OrderItem[];
    status: string;
    note: string;
}

const OrderTracking = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    useEffect(() => {
        const storedOrderDetails = localStorage.getItem('orderDetails');
        if (storedOrderDetails) {
            setOrderDetails(JSON.parse(storedOrderDetails));  // Lấy thông tin đơn hàng từ localStorage
        } else {
            alert('Không tìm thấy thông tin đơn hàng.');
        }
    }, []);

    if (!orderDetails) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="order-tracking-container">
            <div className="order-details">
                <h3>Chi tiết đơn hàng</h3>
                <p><strong>Mã đơn hàng:</strong> {orderDetails.orderCode}</p>
                <p><strong>Họ tên:</strong> {orderDetails.name}</p>
                <p><strong>Số điện thoại:</strong> {orderDetails.phone}</p>
                <p><strong>Địa chỉ:</strong> {orderDetails.address}</p>
                <p><strong>Giới tính:</strong> {orderDetails.gender}</p>
                <p><strong>Tổng tiền:</strong> {Number(orderDetails.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <p><strong>Trạng thái:</strong> {orderDetails.status}</p>
                <p><strong>Ghi chú:</strong> {orderDetails.note}</p>
            </div>

            <div className="order-items">
                <h3>Thông tin các sản phẩm</h3>
                <ul>
                    {orderDetails.items.map((item: OrderItem) => (
                        <li key={item.id}>
                            <div className="order-item">
                                <img src={item.imgUrl} alt={item.name} className="item-image" />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Số lượng: {item.qty}</p>
                                    <p>Giá: {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="back-to-home" onClick={() => window.location.href = '/'}>Trở về trang chủ</button>
        </div>
    );
};

export default OrderTracking;
