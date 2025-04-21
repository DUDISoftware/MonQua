import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Liên kết nhanh</h5>
                            <a href="#" className="d-block footer-link">Giới thiệu</a>
                            <a href="#" className="d-block footer-link">Liên hệ</a>
                        </div>
                        <div className="col-md-4">
                            <h5>Mạng xã hội</h5>
                            <a href="#" className="footer-link">Facebook</a> |
                            <a href="#" className="footer-link">Zalo</a>
                        </div>
                        <div className="col-md-4">
                            <h5>Nhận bản tin</h5>
                            <input type="email" className="form-control" placeholder="Email của bạn" />
                            <button className="btn btn-success mt-2">Đăng ký</button>
                        </div>
                    </div>
                    <div className="footer-credit">
                        © 2025 Món Quà Cũ. All rights reserved.
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
