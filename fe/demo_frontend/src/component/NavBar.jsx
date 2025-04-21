import React, { useEffect } from 'react';
import './NavBar.css';

const Navbar = () => {
  useEffect(() => {
    // Xử lý scroll hiệu ứng
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Active menu theo URL
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-login):not(.btn-register)');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return; // skip links without href
    
      const hrefFile = href.split('/').pop();
      if (hrefFile === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    

    // Cleanup để tránh memory leak
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top"> 
      <div className="container">
        <a className="navbar-brand" href="#">🌿 Món Quà Cũ</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#">Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">Tặng đồ</a></li>
            <li className="nav-item"><a className="nav-link" href="nhando.html">Nhận đồ</a></li>
            <li className="nav-item"><a className="nav-link" href="/congdong">Cộng đồng</a></li>
            <li className="nav-item"><a className="nav-link" href="donation.html">...</a></li>
            <li className="nav-item button-item"><a className="btn btn-login mx-2" href="/login">Đăng nhập</a></li>
            <li className="nav-item button-item"><a className="btn btn-register" href="/register">Đăng ký</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
