import React from 'react'
import './FormDangNhap.css'

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Toggle hiển thị mật khẩu
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('loginPassword');
document.addEventListener('DOMContentLoaded', () => {
  if (togglePassword) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      togglePassword.classList.toggle('fa-eye');
      togglePassword.classList.toggle('fa-eye-slash');
    });
  }
}) 

// Xử lý khi nhập để đổi màu viền
const inputs = [
  { element: document.getElementById('loginUsername'), validator: value => value.trim() },
  { element: document.getElementById('loginPassword'), validator: value => value.trim() }
];

inputs.forEach(input => {
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    if (input) {
      input.element.addEventListener('input', () => {
        if (input.validator(input.element.value)) {
          input.element.classList.remove('error-field');
          input.element.classList.add('valid-field');
        } else {
          input.element.classList.remove('valid-field');
          input.element.classList.add('error-field');
        }
      });
    }

  })
});

// Hàm xử lý form đăng nhập
function validateLoginForm(event) {
  event.preventDefault();

  // Lấy giá trị từ form
  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const errorMessage = document.getElementById('loginError');

  // Reset lỗi trước khi kiểm tra
  errorMessage.style.display = 'none';
  const allInputs = [usernameInput, passwordInput];
  allInputs.forEach(input => input.classList.remove('error-field', 'valid-field'));

  // Kiểm tra các trường
  let hasError = false;
  if (!username) {
    usernameInput.classList.add('error-field');
    hasError = true;
  } else {
    usernameInput.classList.add('valid-field');
  }
  if (!password) {
    passwordInput.classList.add('error-field');
    hasError = true;
  } else {
    passwordInput.classList.add('valid-field');
  }
  if (hasError) {
    errorMessage.textContent = "Vui lòng nhập đầy đủ thông tin";
    errorMessage.style.display = 'block';
    return false;
  }

  // Giả lập kiểm tra đăng nhập
  const correctPassword = "password123"; // Mật khẩu đúng để demo
  if (password !== correctPassword) {
    passwordInput.classList.remove('valid-field');
    passwordInput.classList.add('error-field');
    errorMessage.textContent = "Tên đăng nhập hoặc mật khẩu không đúng";
    errorMessage.style.display = 'block';
    return false;
  }

  // Nếu thành công, hiển thị toast và chuyển hướng
  showToast('Đăng nhập thành công!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);

  return false;
}

// Hàm xử lý quên mật khẩu
function forgotPassword() {
  const username = document.getElementById('loginUsername').value.trim();
  const errorMessage = document.getElementById('loginError');
  errorMessage.style.display = 'none';
  if (!username) {
    document.getElementById('loginUsername').classList.add('error-field');
    errorMessage.textContent = "Vui lòng nhập tên đăng nhập hoặc email để khôi phục mật khẩu.";
    errorMessage.style.display = 'block';
    return;
  }
  // Giả lập gửi email khôi phục mật khẩu
  showToast(`Hướng dẫn khôi phục mật khẩu đã được gửi đến ${username}.`);
}

// Hàm giả lập đăng nhập bằng Google
function loginWithGoogle() {
  showToast('Đăng nhập bằng Google thành công!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

// Hàm giả lập đăng nhập bằng Facebook
function loginWithFacebook() {
  showToast('Đăng nhập bằng Facebook thành công!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

const DangNhap = () => {
  const handleForgotPassword=()=>{
    forgotPassword();
  }
  return (
    <div>
      <div>
        {/* Wrapper chứa form */}
        <div className="auth-wrapper">
          {/* Form Đăng nhập */}
          <div className="auth-container">
            <div className="logo">🌿 Món Quà Cũ</div>
            <h2>Đăng nhập</h2>
            <form id="loginFormElement" onsubmit="return validateLoginForm(event)">
              <div className="form-group" id="loginUsernameGroup">
                <label htmlFor="loginUsername">Tên đăng nhập hoặc Email</label>
                <input type="text" id="loginUsername" placeholder="Nhập tên đăng nhập hoặc email" />
              </div>
              <div className="form-group" id="loginPasswordGroup">
                <label htmlFor="loginPassword">Mật khẩu</label>
                <div className="password-container">
                  <input type="password" id="loginPassword" placeholder="Nhập mật khẩu" />
                  <i className="fas fa-eye password-toggle" id="togglePassword" />
                </div>
              </div>
              <div className="error-message" id="loginError" />
              <button type="submit" className="btn btn-submit">Đăng nhập</button>
              <div className="forgot-password">
                <a href="#" onClick={handleForgotPassword}>Quên mật khẩu?</a>
              </div>
            </form>
            <div className="social-login">
              <a href="#" className="btn-social btn-google" onclick="loginWithGoogle(); return false;">
                <i className="fab fa-google" /> Google
              </a>
              <a href="#" className="btn-social btn-facebook" onclick="loginWithFacebook(); return false;">
                <i className="fab fa-facebook-f" /> Facebook
              </a>
            </div>
            <div className="switch-auth">
              <p>Chưa có tài khoản? <a href="dangky.html">Đăng ký ngay</a></p>
            </div>
            <div className="back-to-home">
              <p><a href="index.html">Trở về trang chủ</a></p>
            </div>
          </div>
        </div>
        {/* Toast thông báo thành công */}
        <div id="toast" className="toast" />
      </div>

    </div>
  )
}

export default DangNhap
