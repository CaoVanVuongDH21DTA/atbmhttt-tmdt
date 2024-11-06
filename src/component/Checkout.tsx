import React, { useState, useEffect } from 'react';
import '../style/checkout.css';
import { useShoppingContext } from '../contexts/ShoppingContext';

const Checkout = () => {
    const { cartItems, totalPrice } = useShoppingContext();
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(0);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('giao_hang_tan_noi');
    const [note, setNote] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            alert("Đơn hàng của bạn đã hoàn tất!");
        }
    };

    const handlePreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="checkout-container">
            <div className="checkout-stepper">
                <div className={`step ${step >= 0 ? 'completed' : ''} ${step === 0 ? 'active' : ''}`}>
                    <div className="step-icon">1</div>
                    <p className="step-title">Giỏ hàng</p>
                </div>
                <div className={`step-divider ${step > 0 ? 'completed' : ''}`}></div>
                <div className={`step ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
                    <div className="step-icon">2</div>
                    <p className="step-title">Thông tin đặt hàng</p>
                </div>
                <div className={`step-divider ${step > 1 ? 'completed' : ''}`}></div>
                <div className={`step ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
                    <div className="step-icon">3</div>
                    <p className="step-title">Thanh toán</p>
                </div>
                <div className={`step-divider ${step > 2 ? 'completed' : ''}`}></div>
                <div className={`step ${step === 3 ? 'active' : ''}`}>
                    <div className="step-icon">4</div>
                    <p className="step-title">Hoàn tất</p>
                </div>
            </div>

            <div className="checkout-items">
                {step === 0 && cartItems.length === 0 && (
                    <p>Làm gì có món hàng nào mà coi, hãy mua hàng đi.</p>
                )}
                {step === 0 && cartItems.length > 0 && (
                    cartItems.map((item) => (
                        <div className="checkout-item" key={item.id}>
                            <img src={item.imgUrl} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h2>{item.name}</h2>
                                <p>Giá: {Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p>Số lượng: {item.qty}</p>
                            </div>
                        </div>
                    ))
                )}
                {step === 1 && (
                    <div className="step01">
                        <h2>Thông tin khách mua hàng</h2>
                        <div className="choose-sex">
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        value="Anh"
                                        checked={gender === 'Anh'}
                                        onChange={() => setGender('Anh')}
                                        onClick={() => setName('')}
                                    />
                                    Anh
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Chị"
                                        checked={gender === 'Chị'}
                                        onChange={() => setGender('Chị')}
                                        onClick={() => setName('')}
                                    />
                                    Chị
                                </label>
                            </div>
                        </div>
                        <div className="Enterinformation">
                            <input
                                type="text"
                                placeholder="Nhập họ tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <h3>Chọn cách nhận hàng</h3>
                            <label>
                                <input
                                    type="radio"
                                    value="giao_hang_tan_noi"
                                    checked={deliveryMethod === 'giao_hang_tan_noi'}
                                    onChange={() => setDeliveryMethod('giao_hang_tan_noi')}
                                />
                                Giao hàng tận nơi
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="Số nhà, tên đường"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <div>
                            <h4>Dịch vụ giao hàng</h4>
                            <p>Miễn phí vận chuyển (Giao hàng tiêu chuẩn)</p>
                            <p>Phí vận chuyển: Miễn phí</p>
                            <p>
                                Tổng tiền: <strong>{Number(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                            </p>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="step02">
                        <h2>Xác nhận thông tin đặt hàng</h2>
                        <p><strong>Giới tính:</strong> {gender}</p>
                        <p><strong>Họ tên:</strong> {name}</p>
                        <p><strong>Số điện thoại:</strong> {phone}</p>
                        <p><strong>Địa chỉ:</strong> {address}</p>
                        <p><strong>Ghi chú:</strong> {note}</p>
                        <p><strong>Tổng tiền:</strong> {Number(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                )}
                {step === 3 && <div><i className="bi bi-check-circle-fill"></i><p>Cảm ơn bạn đã đặt hàng!</p></div>}
            </div>

            {step < 3 && cartItems.length > 0 && (
                <div className="back-summary">
                    <h2>Tổng cộng</h2>
                    <p>
                        Tổng giá trị: <span>{Number(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </p>
                    <div className="button-group">
                        {step > 0 && (
                            <button className="btn-back" onClick={handlePreviousStep}>
                                Trở lại
                            </button>
                        )}
                        <button
                            className="btn-pay"
                            onClick={handleNextStep}
                        >
                            {step === 2 ? "Hoàn tất" : "Thanh toán"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;