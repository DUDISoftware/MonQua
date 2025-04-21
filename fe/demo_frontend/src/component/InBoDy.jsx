import React from 'react'
import './InBoDy.css'
import { useEffect, useRef } from 'react';
import imageNguoiTraoDo from '/src/img/image.png';

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Hiển thị/ẩn nút Back to Top
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block'
    } else {
        backToTopBtn.style.display = 'none'
    }
});

// Xử lý sự kiện click cho nút Back to Top
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.item-card, .step').forEach(item => observer.observe(item));
// Hiệu ứng nổi khung tìm kiếm
// const searchInput = document.getElementById('searchInput');
// const searchContainer = document.getElementById('searchContainer');
// searchInput.addEventListener('focus', () => {
//     searchContainer.classList.add('active');
// });
// searchInput.addEventListener('blur', () => {
//     searchContainer.classList.remove('active');
// });
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');

    if (searchInput && searchContainer) {
        searchInput.addEventListener('focus', () => {
            searchContainer.classList.add('active');
        });

        searchInput.addEventListener('blur', () => {
            searchContainer.classList.remove('active');
        });
    } else {
        console.warn("Không tìm thấy phần tử searchInput hoặc searchContainer");
    }
});
// Tính toán thời gian đăng
function timeSince(date) {
    const now = new Date();
    const postedDate = new Date(date);
    const seconds = Math.floor((now - postedDate) / 1000);

    let interval = seconds / 86400; // Số ngày
    if (interval > 1) {
        return `Đăng ${Math.floor(interval)} ngày trước`;
    }
    interval = seconds / 3600; // Số giờ
    if (interval > 1) {
        return `Đăng ${Math.floor(interval)} giờ trước`;
    }
    interval = seconds / 60; // Số phút
    if (interval > 1) {
        return `Đăng ${Math.floor(interval)} phút trước`;
    }
    return `Đăng vừa xong`;
}

document.querySelectorAll('.item-card').forEach(card => {
    const postedTime = card.getAttribute('data-posted-time');
    const timeElement = card.querySelector('.posted-time');
    timeElement.textContent = timeSince(postedTime);
});

// Hiệu ứng di chuyển ngẫu nhiên cho hình ảnh và icon
function moveElement(element, duration) {
    const container = document.querySelector('.cta');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Tạo vị trí ngẫu nhiên ban đầu, đảm bảo nằm trong khung
    let startX = Math.random() * (containerWidth - element.offsetWidth);
    let startY = Math.random() * (containerHeight - element.offsetHeight);
    startX = Math.max(0, Math.min(startX, containerWidth - element.offsetWidth));
    startY = Math.max(0, Math.min(startY, containerHeight - element.offsetHeight));
    element.style.left = startX + 'px';
    element.style.top = startY + 'px';

    // Tạo vị trí ngẫu nhiên đích, đảm bảo nằm trong khung
    let endX = Math.random() * (containerWidth - element.offsetWidth);
    let endY = Math.random() * (containerHeight - element.offsetHeight);
    endX = Math.max(0, Math.min(endX, containerWidth - element.offsetWidth));
    endY = Math.max(0, Math.min(endY, containerHeight - element.offsetHeight));

    // Tạo animation di chuyển
    element.animate([
        { transform: `translate(${startX}px, ${startY}px)` },
        { transform: `translate(${endX}px, ${endY}px)` }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

// Hiệu ứng chuyển màu cho icon
function changeColor(element, duration) {
    const colors = ['#FF6F61', '#FF69B4', '#FFD700', '#40C4FF']; // Cam, hồng, vàng, xanh
    element.animate([
        { color: colors[0] },
        { color: colors[1] },
        { color: colors[2] },
        { color: colors[3] },
        { color: colors[0] }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// Áp dụng hiệu ứng cho hình ảnh
document.querySelectorAll('.floating-images img').forEach(img => {
    const duration = Math.random() * 5000 + 10000; // Thời gian ngẫu nhiên từ 10s đến 15s
    moveElement(img, duration);
});

// Áp dụng hiệu ứng cho icon (di chuyển và chuyển màu)
document.querySelectorAll('.floating-icons i').forEach(icon => {
    const duration = Math.random() * 5000 + 10000; // Thời gian ngẫu nhiên từ 10s đến 15s
    moveElement(icon, duration);
    changeColor(icon, 4000); // Chuyển màu mỗi 4s
});

const InBoDy = () => {
  const ctaRef = useRef(null);
  const lastClickTime = useRef(0);
  const doubleClickDelay = 300;

  useEffect(() => {
    const ctaSection = ctaRef.current;                                                                         
    if (!ctaSection) return;
  
    let clickTimeout = null;
  
    const handleClick = (event) => {
      // Delay xử lý click để chờ xem có double không
      if (clickTimeout) clearTimeout(clickTimeout);
  
      clickTimeout = setTimeout(() => {
        const currentTime = new Date().getTime();
        const timeSinceLastClick = currentTime - lastClickTime.current;
  
        if (timeSinceLastClick > doubleClickDelay) {
          const clickX = event.clientX - ctaSection.getBoundingClientRect().left;
          const clickY = event.clientY - ctaSection.getBoundingClientRect().top;
  
          const elements = [
            ...ctaSection.querySelectorAll('.floating-images img'),
            ...ctaSection.querySelectorAll('.floating-icons i'),
          ];
  
          elements.forEach((element) => {
            if (element.style.display !== 'none') {
              const elementX = parseFloat(element.style.left) + element.offsetWidth / 2;
              const elementY = parseFloat(element.style.top) + element.offsetHeight / 2;
  
              const distance = Math.sqrt((elementX - clickX) ** 2 + (elementY - clickY) ** 2);
  
              if (distance < 100) {
                const angle = Math.atan2(elementY - clickY, elementX - clickX);
                const pushDistance = 150;
                const newX = elementX + Math.cos(angle) * pushDistance;
                const newY = elementY + Math.sin(angle) * pushDistance;
  
                const containerWidth = ctaSection.offsetWidth
                const containerHeight = ctaSection.offsetHeight;
                const boundedX = Math.max(0, Math.min(newX - element.offsetWidth / 2, containerWidth - element.offsetWidth));
                const boundedY = Math.max(0, Math.min(newY - element.offsetHeight / 2, containerHeight - element.offsetHeight));
  
                element.getAnimations().forEach((animation) => animation.cancel());
  
                element.animate(
                  [
                    {
                      transform: `translate(${parseFloat(element.style.left)}px, ${parseFloat(element.style.top)}px)`,
                    },
                    {
                      transform: `translate(${boundedX}px, ${boundedY}px)`,
                    },
                  ],
                  {
                    duration: 500,
                    easing: 'ease-out',
                    fill: 'forwards',
                  }
                );
  
                element.style.left = `${boundedX}px`;
                element.style.top = `${boundedY}px`;
  
                const duration = Math.random() * 5000 + 10000;
                moveElement(element, duration);
              }
            }
          });
        }
  
        lastClickTime.current = currentTime;
      }, doubleClickDelay + 10); // Chờ thêm chút để chắc chắn không phải dblclick
    };
  
    const handleDoubleClick = () => {
      // Nếu là double click thì huỷ xử lý click
      if (clickTimeout) clearTimeout(clickTimeout);
  
      const elements = [
        ...ctaSection.querySelectorAll('.floating-images img'),
        ...ctaSection.querySelectorAll('.floating-icons i'),
      ];
  
      elements.forEach((element) => {
        if (element.style.display === 'none') {
          element.style.display = 'block';
        }
  
        element.getAnimations().forEach((animation) => animation.cancel())
  
        const duration = Math.random() * 5000 + 10000;
        moveElement(element, duration);
  
        if (element.tagName === 'I') {
          changeColor(element, 4000);
        }
      });
    };
  
    ctaSection.addEventListener('click', handleClick);
    ctaSection.addEventListener('dblclick', handleDoubleClick);
  
    return () => {
      ctaSection.removeEventListener('click', handleClick);
      ctaSection.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);
  
  return (
    <div>
        <div>
  <section className="hero py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 hero-text">
          <h1 className="display-4 fw-bold">Tặng món đồ cũ, trao đi yêu thương mới</h1>
          <p className="hero-slogan">Lan tỏa niềm vui từ những điều nhỏ bé</p>
          <p className="lead">Chia sẻ những món đồ không dùng đến với cộng đồng. Miễn phí, nhanh chóng, đầy nhân văn.</p>
          <a href="#" className="btn btn-lg hero-btn text-white">🌱 Bắt đầu tặng đồ</a>
        </div>
        <div className="col-lg-6 hero-img">
          <img src={imageNguoiTraoDo} alt="Người trao đồ" className="img-fluid" />
        </div>
      </div>
    </div>
  </section>
  <div className="section-divider" />
  {/* 3. Search & Filter */}
  <section className="search-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="search-container" id="searchContainer">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="search-input-group">
                <i className="fas fa-search" />
                <input type="text" className="form-control search-bar" placeholder="Tìm áo, sách, đồ chơi…" id="searchInput" />
              </div>
              <div className="position-relative">
                <i className="fas fa-tshirt select-icon" />
                <select className="form-select">
                  <option>Loại đồ</option>
                  <option>Quần áo</option>
                  <option>Sách</option>
                </select>
              </div>
              <div className="position-relative">
                <i className="fas fa-map-marker-alt select-icon" />
                <select className="form-select">
                  <option>Khu vực</option>
                  <option>Q.1, TP.HCM</option>
                  <option>Thủ Đức</option>
                </select>
              </div>
              <button className="btn btn-search">Tìm kiếm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <div className="section-divider" />
  {/* 4. Latest Items */}
  <section className="latest-items">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold">Danh sách đồ mới nhất</h2>
      <div className="row">
        {/* Sản phẩm 1 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-10T10:00:00Z">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Áo sơ mi" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Áo sơ mi</h5>
              <p className="condition">Còn mới 90%</p>
              <p className="posted-time" />
              <p className="card-text">Q.1, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 2 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-09T08:00:00Z">
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Sách cũ" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Sách cũ</h5>
              <p className="condition">Đã qua sử dụng</p>
              <p className="posted-time" />
              <p className="card-text">Thủ Đức</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 3 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-10T07:00:00Z">
            <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Đồ chơi" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Đồ chơi</h5>
              <p className="condition">Còn mới 80%</p>
              <p className="posted-time" />
              <p className="card-text">Q.7, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 4 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-10T05:00:00Z">
            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Tai nghe" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Tai nghe</h5>
              <p className="condition">Đã qua sử dụng</p>
              <p className="posted-time" />
              <p className="card-text">Q.3, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 5 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-10T09:00:00Z">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Áo khoác" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Áo khoác</h5>
              <p className="condition">Còn mới 95%</p>
              <p className="posted-time" />
              <p className="card-text">Q.5, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 6 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-08T08:00:00Z">
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Sách giáo khoa" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Sách giáo khoa</h5>
              <p className="condition">Đã qua sử dụng</p>
              <p className="posted-time" />
              <p className="card-text">Q.10, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 7 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-10T06:00:00Z">
            <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Xe đồ chơi" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Xe đồ chơi</h5>
              <p className="condition">Còn mới 70%</p>
              <p className="posted-time" />
              <p className="card-text">Q.2, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 8 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-10T04:00:00Z">
            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Loa Bluetooth" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Loa Bluetooth</h5>
              <p className="condition">Đã qua sử dụng</p>
              <p className="posted-time" />
              <p className="card-text">Q.9, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
        {/* Sản phẩm 9 */}
        <div className="col-md-4 mb-4">
          <div className="card item-card" data-posted-time="2025-04-07T08:00:00Z">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="card-img-top" alt="Quần jeans" />
            <div className="card-body">
              <h5 className="card-title fw-bold">Quần jeans</h5>
              <p className="condition">Còn mới 85%</p>
              <p className="posted-time" />
              <p className="card-text">Q.4, TP.HCM</p>
              <a href="#" className="btn btn-success">Xem chi tiết</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="section-divider" />
  {/* 5. Categories */}
  <section className="categories">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold">Danh mục phổ biến</h2>
      <div className="row justify-content-center">
        <div className="col-md-2 category-item">
          <div className="category-circle">
            <i className="fas fa-tshirt" />
            <h5>Quần áo</h5>
          </div>
        </div>
        <div className="col-md-2 category-item">
          <div className="category-circle">
            <i className="fas fa-book" />
            <h5>Sách vở</h5>
          </div>
        </div>
        <div className="col-md-2 category-item">
          <div className="category-circle">
            <i className="fas fa-dice" />
            <h5>Đồ chơi</h5>
          </div>
        </div>
        <div className="col-md-2 category-item">
          <div className="category-circle">
            <i className="fas fa-blender" />
            <h5>Đồ gia dụng</h5>
          </div>
        </div>
        <div className="col-md-2 category-item">
          <div className="category-circle">
            <i className="fas fa-laptop" />
            <h5>Đồ điện tử</h5>
          </div>
        </div>
        <div className="col-md-2 category-item">
          <div className="category-circle">
            <i className="fas fa-leaf" />
            <h5>Cây cảnh</h5>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="section-divider" />
  {/* 6. How it Works */}
  <section className="how-it-works">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold">Cách hoạt động</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-camera" />
            </div>
            <div className="step-content">
              <h3>1. Đăng đồ</h3>
              <p>Chụp ảnh và đăng món đồ bạn muốn tặng lên nền tảng.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-envelope" />
            </div>
            <div className="step-content">
              <h3>2. Yêu cầu</h3>
              <p>Người khác gửi yêu cầu nhận món đồ của bạn.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-handshake" />
            </div>
            <div className="step-content">
              <h3>3. Trao tay</h3>
              <p>Hẹn gặp và trao đổi trực tiếp với người nhận.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="section-divider" />
  {/* 7. Why Us */}
  <section className="why-us">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold">Vì sao nên chọn chúng tôi?</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="reason-card">
            <i className="fas fa-recycle" />
            <h4>Bảo vệ môi trường</h4>
            <p>Giảm rác thải bằng cách tái sử dụng đồ cũ, góp phần bảo vệ hành tinh xanh.</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="reason-card">
            <i className="fas fa-heart" />
            <h4>Lan tỏa yêu thương</h4>
            <p>Chia sẻ đồ dùng với những người cần, mang lại niềm vui và sự hỗ trợ.</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="reason-card">
            <i className="fas fa-lightbulb" />
            <h4>Văn minh &amp; tiết kiệm</h4>
            <p>Thói quen tái sử dụng giúp tiết kiệm chi phí và xây dựng lối sống bền vững.</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="reason-card">
            <i className="fas fa-rocket" />
            <h4>Dễ dàng sử dụng</h4>
            <p>Giao diện thân thiện, thao tác đơn giản, ai cũng có thể tham gia.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="section-divider" />
  {/* 8. Testimonials */}
  <section className="testimonials">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold">Câu chuyện người dùng</h2>
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="testimonial-card">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Avatar" />
                  <blockquote>“Mình tặng được 3 cái vali cũ trong 1 ngày, người nhận cảm ơn rối rít.”</blockquote>
                  <p>– Anh Minh, Thủ Đức</p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="testimonial-card">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Avatar" />
                  <blockquote>“Nhờ Món Quà Cũ, mình nhận được bộ sách giáo khoa miễn phí, rất hữu ích!”</blockquote>
                  <p>– Chị Lan, Q.7</p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="testimonial-card">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Avatar" />
                  <blockquote>“Mình tặng một chiếc áo khoác cũ, không ngờ lại giúp được một bạn nhỏ.”</blockquote>
                  <p>– Anh Hùng, Q.1</p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="testimonial-card">
                  <img src="https://images.unsplash.com/photo-1517841903200-7b8d4b8e7a2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Avatar" />
                  <blockquote>“Cộng đồng rất thân thiện, mình đã tìm được đồ chơi cho con mà không tốn phí.”</blockquote>
                  <p>– Chị Mai, Q.3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
  <div className="section-divider" />
  {/* 11. Call to Action - Thêm 30 hình ảnh, 20 icon, icon chuyển màu */}
  <div ref={ctaRef} className="cta">
    <div className="container">
      <div className="cta-content">
        <h2>Trao đi món đồ cũ, nhận lại niềm vui mới!</h2>
        <p>Hãy để những món đồ không còn dùng đến của bạn tìm được ngôi nhà mới, nơi chúng tiếp tục mang lại giá trị và niềm vui.</p>
        <a href="#gift" className="btn">🌟 Tặng ngay hôm nay</a>
      </div>
      <div className="floating-images">
        {/* 30 hình ảnh */}
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Áo sơ mi" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách cũ" />
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Đồ chơi" />
        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Tai nghe" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Áo khoác" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách giáo khoa" />
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Xe đồ chơi" />
        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Loa Bluetooth" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Quần jeans" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách văn học" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Áo sơ mi" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách cũ" />
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Đồ chơi" />
        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Tai nghe" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Áo khoác" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách giáo khoa" />
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Xe đồ chơi" />
        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Loa Bluetooth" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Quần jeans" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách văn học" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Áo sơ mi" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách cũ" />
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Đồ chơi" />
        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Tai nghe" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Áo khoác" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách giáo khoa" />
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Xe đồ chơi" />
        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Loa Bluetooth" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Quần jeans" />
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sách văn học" />
      </div>
      <div className="floating-icons">
        {/* 20 icon */}
        <i className="fas fa-heart" />
        <i className="fas fa-smile" />
        <i className="fas fa-star" />
        <i className="fas fa-gift" />
        <i className="fas fa-thumbs-up" />
        <i className="fas fa-heart" />
        <i className="fas fa-smile" />
        <i className="fas fa-star" />
        <i className="fas fa-gift" />
        <i className="fas fa-thumbs-up" />
        <i className="fas fa-heart" />
        <i className="fas fa-smile" />
        <i className="fas fa-star" />
        <i className="fas fa-gift" />
        <i className="fas fa-thumbs-up" />
        <i className="fas fa-heart" />
        <i className="fas fa-smile" />
        <i className="fas fa-star" />
        <i className="fas fa-gift" />
        <i className="fas fa-thumbs-up" />
      </div>
    </div>
  </div>
  {/* 12. Footer */}
  {/* Nhúng footer */}
  <div id="footer" />
  {/* Back to Top Button */}
  {/* <button id="backToTopBtn" title="Quay lại đầu trang">
    <i className="fas fa-arrow-up" />
  </button> */}
</div>

    </div>
  )
}

export default InBoDy
