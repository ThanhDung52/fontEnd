import React from "react";
import "./footer.css";  // Import file CSS

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
              {/* <img src="/path-to-your-logo.png" alt="Cookpa Logo" /> */}
            <p>&copy; 2024 Cookpa. All Rights Reserved.</p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#">Công thức nấu ăn</a></li>
                <li><a href="#">Salad mùa đông</a></li>
                <li><a href="#">Gà hữu cơ</a></li>
                <li><a href="#">Thịt bò và cừu</a></li>
                <li><a href="#">Sữa có hương vị</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h5>Explore</h5>
              <ul>
                <li><a href="#">Blog của chúng tôi</a></li>
                <li><a href="#">Cuộc thi/Giải thưởng</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Phát hành mới</a></li>
                <li><a href="#">Bản tin</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h5>Support</h5>
              <ul>
                <li><a href="#">Câu hỏi thường gặp</a></li>
                <li><a href="#">Ban quản trị</a></li>
                <li><a href="#">Nhân viên của chúng tôi</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h5>Tham gia Bản tin của Chúng tôi</h5>
            <div className="newsletter-form">
              <input type="email" placeholder="Nhập Email của bạn" />
              <button>Đăng ký</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" className="social-icon facebook-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.594 0 0 .594 0 1.325v21.35C0 23.406.594 24 1.325 24H12v-9.294H9.293V11.41H12V9.292c0-2.633 1.606-4.065 3.953-4.065 1.125 0 2.09.084 2.372.12v2.752h-1.628c-1.28 0-1.529.609-1.529 1.504v1.973h3.059l-.399 3.294H15.168V24h7.507c.73 0 1.325-.594 1.325-1.325v-21.35C24 .594 23.406 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="social-icon youtube-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186s-.237-1.674-.96-2.412c-.92-.96-1.948-.963-2.42-1.018-3.372-.244-8.43-.244-8.43-.244h-.01s-5.058 0-8.43.243c-.47.057-1.498.059-2.418 1.018-.725.738-.963 2.412-.963 2.412S0 8.37 0 10.556v1.894c0 2.188.244 4.37.244 4.37s.237 1.674.963 2.412c.92.96 2.13.93 2.672 1.033 1.94.186 8.186.243 8.186.243s5.062-.008 8.434-.253c.471-.057 1.498-.059 2.418-1.018.725-.738.96-2.412.96-2.412s.244-2.182.244-4.37v-1.894c0-2.188-.244-4.37-.244-4.37zm-13.84 9.097V8.718l6.568 3.282-6.568 3.283z" />
              </svg>
            </a>
            <a href="#" className="social-icon instagram-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.053c-5.1 0-9.25 4.048-9.25 9.25S6.9 20.553 12 20.553c5.1 0 9.25-4.048 9.25-9.25S17.1 2.053 12 2.053zm6.23 9.75a6.236 6.236 0 01-12.47 0 6.236 6.236 0 0112.47 0zm-1.493 0a4.743 4.743 0 01-9.487 0 4.743 4.743 0 019.487 0zm-5.37-3.117a.87.87 0 01-1.738 0 .87.87 0 011.738 0zM18.46 5.072c-.485 0-.88.395-.88.88s.395.88.88.88.88-.395.88-.88-.395-.88-.88-.88z" />
              </svg>
            </a>
          </div>
          <p>Follow us on Social Media</p>
        </div>
      </div>
    </footer>
  );
};
