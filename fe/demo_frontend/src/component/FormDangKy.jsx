import React, { useState, useEffect } from 'react';
import './FormDangKy.css';

const FormDangKy = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    gender: '',
    day: '',
    month: '',
    year: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(''), 2000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, gender, day, month, year, password, confirmPassword } = formData;

    if (!username || !email || !gender || !day || !month || !year || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ");
      return;
    }

    const dob = new Date(year, month - 1, day);
    if (isNaN(dob.getTime()) || dob >= new Date()) {
      setError("Ngày sinh không hợp lệ");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    // Thành công
    setError('');
    setToast('Đăng ký thành công!');
    setTimeout(() => {
      window.location.href = 'dangnhap.html';
    }, 2000);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="logo">🌿 Món Quà Cũ</div>
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ngày sinh</label>
            <div className="dob-container">
              <select name="day" value={formData.day} onChange={handleChange}>
                <option value="">Ngày</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select name="month" value={formData.month} onChange={handleChange}>
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                ))}
              </select>
              <select name="year" value={formData.year} onChange={handleChange}>
                <option value="">Năm</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <i
                className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                onClick={() => setShowConfirmPassword(prev => !prev)}
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-submit">Đăng ký</button>
        </form>
        <div className="switch-auth">
          <p>Đã có tài khoản? <a href="dangnhap.html">Đăng nhập ngay</a></p>
        </div>
        <div className="back-to-home">
          <p><a href="index.html">Trở về trang chủ</a></p>
        </div>
        {toast && <div className="toast show">{toast}</div>}
      </div>
    </div>
  );
};

export default FormDangKy;
