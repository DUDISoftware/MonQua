import React, { useRef, useState } from 'react'
import './CongDong.css'
const CongDong = ({ onCreatePost }) => {
    const [postContent, setPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('all-posts');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Posting:", postContent);
    // You would actually call a createPost function here
  };

  const handleFileClick = () => {
    document.getElementById('photoUpload')?.click();
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClick = ()=>{

  }
  const handleOnSubmit = ()=>{

  }

  const tabs = [
    { id: 'all-posts', label: 'Tất cả bài viết' },
    { id: 'touching-stories', label: 'Câu chuyện cảm động' },
    { id: 'thanks', label: 'Cảm ơn người tặng' },
    { id: 'tips', label: 'Góc chia sẻ mẹo' },
    { id: 'ideas', label: 'Góp ý / Ý tưởng' },
  ];

  return (
    <div>
        <div>
  <div id="header" />
  {/* Header Section */}
  <section className="header-section">
    <h1>Cộng đồng Món Quà Cũ</h1>
    <p>Chia sẻ câu chuyện – Lan tỏa yêu thương – Gắn kết những tấm lòng.</p>
  </section>
  {/* Post Creation Section */}
  <section className="post-creation-section">
    <form id="postForm" onSubmit={handleOnSubmit}>
      <div className="post-input-area">
        <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=40&q=80" alt="User Avatar" />
        <textarea className="post-input" id="postContent" placeholder="Bạn đang nghĩ gì?" rows={1} required defaultValue={""} />
      </div>
      <div className="post-options">
        <div className="option" onClick={handleClick}>
          <i className="fas fa-camera" /> Ảnh (tối đa 5 ảnh)
          <input type="file" id="photoUpload" accept="image/*" multiple style={{display: 'none'}} />
        </div>
        <div className="option post-type">
          <i className="fas fa-list" />
          <select id="postType">
            <option value="all-posts">Bài viết</option>
            <option value="touching-stories">Câu chuyện cảm động</option>
            <option value="thanks">Cảm ơn người tặng</option>
            <option value="tips">Góc chia sẻ mẹo</option>
            <option value="ideas">Góp ý / Ý tưởng</option>
          </select>
        </div>
      </div>
      <div className="photo-preview" id="photoPreview" />
      <button type="submit" className="btn-post">Đăng bài</button>
    </form>
  </section>
  {/* Tabs Section */}
  <section className="tabs-section">
    <ul className="nav nav-tabs" id="postTabs" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="all-posts-tab" data-bs-toggle="tab" data-bs-target="#all-posts" type="button" role="tab">Tất cả bài viết</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="touching-stories-tab" data-bs-toggle="tab" data-bs-target="#touching-stories" type="button" role="tab">Câu chuyện cảm động</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="thanks-tab" data-bs-toggle="tab" data-bs-target="#thanks" type="button" role="tab">Cảm ơn người tặng</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="tips-tab" data-bs-toggle="tab" data-bs-target="#tips" type="button" role="tab">Góc chia sẻ mẹo</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="ideas-tab" data-bs-toggle="tab" data-bs-target="#ideas" type="button" role="tab">Góp ý / Ý tưởng</button>
      </li>
    </ul>
  </section>
  {/* Community Info Section (Hiển thị trên màn hình nhỏ) */}
  <section className="community-info-section" id="community-info-section">
    {/* Nội dung sẽ được thêm động bằng JavaScript */}
  </section>
  {/* Content Wrapper (Posts List + Sidebar) */}
  <div className="content-wrapper">
    {/* Posts List Section */}
    <section className="posts-list-section">
      <div className="tab-content" id="postTabsContent">
        {/* All Posts */}
        <div className="tab-pane fade show active" id="all-posts" role="tabpanel">
          <div className="post-card" data-post-id={1}>
            <div className="post-header">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80" alt="Minh Anh" />
              <div className="post-info">
                <h3>Minh Anh</h3>
                <p>1 giờ trước</p>
              </div>
            </div>
            <div className="post-content">
              <p>Tôi vừa nhận được một cuốn sách cũ từ trang này. Nó không chỉ là một món quà, mà còn là câu chuyện về hành trình của người tặng. Rất cảm động!</p>
            </div>
            <div className="post-images">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80" alt="Sách cũ" />
            </div>
            <div className="post-actions">
              <button onClick={handleClick}><i className="fas fa-heart" /> Thả tim (0)</button>
              <button  onClick={handleClick}><i className="fas fa-comment" /> Bình luận</button>
            </div>
            <div className="comment-section" id="comment-section-1">
              <div className="show-more" id="show-more-1" style={{display: 'none'}}>
                <button  onClick={handleClick}>Hiển thị thêm</button>
              </div>
              <div className="comments-list" id="comments-list-1">
                {/* Bình luận sẽ được thêm động */}
              </div>
              <div className="comment-form">
                <textarea placeholder="Viết bình luận của bạn..." required defaultValue={""} />
                <button className="btn-comment"  onClick={handleClick}>Gửi</button>
              </div>
            </div>
          </div>
          <div className="post-card" data-post-id={2}>
            <div className="post-header">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Thanh Tâm" />
              <div className="post-info">
                <h3>Thanh Tâm</h3>
                <p>2 ngày trước</p>
              </div>
            </div>
            <div className="post-content">
              <p>Cảm ơn bạn đã tặng tôi chiếc áo len ấm áp này. Tôi sẽ trân trọng nó!</p>
            </div>
            <div className="post-actions">
              <button  onClick={handleClick}><i className="fas fa-heart" /> Thả tim (0)</button>
              <button  onClick={handleClick}><i className="fas fa-comment" /> Bình luận</button>
            </div>
            <div className="comment-section" id="comment-section-2">
              <div className="show-more" id="show-more-2" style={{display: 'none'}}>
                <button  onClick={handleClick}>Hiển thị thêm</button>
              </div>
              <div className="comments-list" id="comments-list-2">
                {/* Bình luận sẽ được thêm động */}
              </div>
              <div className="comment-form">
                <textarea placeholder="Viết bình luận của bạn..." required defaultValue={""} />
                <button className="btn-comment"  onClick={handleClick}>Gửi</button>
              </div>
            </div>
          </div>
        </div>
        {/* Touching Stories */}
        <div className="tab-pane fade" id="touching-stories" role="tabpanel">
          <div className="post-card" data-post-id={3}>
            <div className="post-header">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80" alt="Minh Anh" />
              <div className="post-info">
                <h3>Minh Anh</h3>
                <p>1 giờ trước</p>
              </div>
            </div>
            <div className="post-content">
              <p>Tôi vừa nhận được một cuốn sách cũ từ trang này. Nó không chỉ là một món quà, mà còn là câu chuyện về hành trình của người tặng. Rất cảm động!</p>
            </div>
            <div className="post-images">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80" alt="Sách cũ" />
            </div>
            <div className="post-actions">
              <button  onClick={handleClick}><i className="fas fa-heart" /> Thả tim (0)</button>
              <button  onClick={handleClick}><i className="fas fa-comment" /> Bình luận</button>
            </div>
            <div className="comment-section" id="comment-section-3">
              <div className="show-more" id="show-more-3" style={{display: 'none'}}>
                <button  onClick={handleClick}>Hiển thị thêm</button>
              </div>
              <div className="comments-list" id="comments-list-3">
                {/* Bình luận sẽ được thêm động */}
              </div>
              <div className="comment-form">
                <textarea placeholder="Viết bình luận của bạn..." required defaultValue={""} />
                <button className="btn-comment"  onClick={handleClick}>Gửi</button>
              </div>
            </div>
          </div>
        </div>
        {/* Thanks */}
        <div className="tab-pane fade" id="thanks" role="tabpanel">
          <div className="post-card" data-post-id={4}>
            <div className="post-header">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Thanh Tâm" />
              <div className="post-info">
                <h3>Thanh Tâm</h3>
                <p>2 ngày trước</p>
              </div>
            </div>
            <div className="post-content">
              <p>Cảm ơn bạn đã tặng tôi chiếc áo len ấm áp này. Tôi sẽ trân trọng nó!</p>
            </div>
            <div className="post-actions">
              <button  onClick={handleClick}><i className="fas fa-heart" /> Thả tim (0)</button>
              <button  onClick={handleClick}><i className="fas fa-comment" /> Bình luận</button>
            </div>
            <div className="comment-section" id="comment-section-4">
              <div className="show-more" id="show-more-4" style={{display: 'none'}}>
                <button  onClick={handleClick}>Hiển thị thêm</button>
              </div>
              <div className="comments-list" id="comments-list-4">
                {/* Bình luận sẽ được thêm động */}
              </div>
              <div className="comment-form">
                <textarea placeholder="Viết bình luận của bạn..." required defaultValue={""} />
                <button className="btn-comment"  onClick={handleClick}>Gửi</button>
              </div>
            </div>
          </div>
        </div>
        {/* Tips */}
        <div className="tab-pane fade" id="tips" role="tabpanel">
          <div className="post-card" data-post-id={5}>
            <div className="post-header">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=40&q=80" alt="Hoàng Nam" />
              <div className="post-info">
                <h3>Hoàng Nam</h3>
                <p>3 ngày trước</p>
              </div>
            </div>
            <div className="post-content">
              <p>Mẹo nhỏ: Tái sử dụng quần áo cũ thành khăn lau rất tiện lợi và tiết kiệm!</p>
            </div>
            <div className="post-actions">
              <button  onClick={handleClick}><i className="fas fa-heart" /> Thả tim (0)</button>
              <button  onClick={handleClick}><i className="fas fa-comment" /> Bình luận</button>
            </div>
            <div className="comment-section" id="comment-section-5">
              <div className="show-more" id="show-more-5" style={{display: 'none'}}>
                <button  onClick={handleClick}>Hiển thị thêm</button>
              </div>
              <div className="comments-list" id="comments-list-5">
                {/* Bình luận sẽ được thêm động */}
              </div>
              <div className="comment-form">
                <textarea placeholder="Viết bình luận của bạn..." required defaultValue={""} />
                <button className="btn-comment"  onClick={handleClick}>Gửi</button>
              </div>
            </div>
          </div>
        </div>
        {/* Ideas */}
        <div className="tab-pane fade" id="ideas" role="tabpanel">
          <div className="post-card" data-post-id={6}>
            <div className="post-header">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=40&q=80" alt="Ẩn danh" />
              <div className="post-info">
                <h3>Ẩn danh</h3>
                <p>1 tuần trước</p>
              </div>
            </div>
            <div className="post-content">
              <p>Tôi nghĩ app có thể thêm tính năng nhắn tin trực tiếp giữa người tặng và người nhận để tiện trao đổi hơn.</p>
            </div>
            <div className="post-actions">
              <button  onClick={handleClick}><i className="fas fa-heart" /> Thả tim (0)</button>
              <button  onClick={handleClick}><i className="fas fa-comment" /> Bình luận</button>
            </div>
            <div className="comment-section" id="comment-section-6">
              <div className="show-more" id="show-more-6" style={{display: 'none'}}>
                <button  onClick={handleClick}>Hiển thị thêm</button>
              </div>
              <div className="comments-list" id="comments-list-6">
                {/* Bình luận sẽ được thêm động */}
              </div>
              <div className="comment-form">
                <textarea placeholder="Viết bình luận của bạn..." required defaultValue={""} />
                <button className="btn-comment"  onClick={handleClick}>Gửi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Sidebar Section */}
    <section className="sidebar-section" id="sidebar-section">
      <div className="announcement" id="sidebar-announcement">
        <h3>Thông báo cộng đồng</h3>
        <p>Đợt sự kiện <span>Tặng đồ tập thể</span> sẽ diễn ra vào ngày 20/4/2025. Tham gia ngay!</p>
      </div>
      <div className="active-user" id="sidebar-active-user">
        <h3>Top 5 người chia sẻ tích cực</h3>
        <ul>
          <li><span>Minh Anh</span> – 5 bài viết</li>
          <li><span>Thanh Tâm</span> – 4 bài viết</li>
          <li><span>Hoàng Nam</span> – 3 bài viết</li>
          <li><span>Ngọc Linh</span> – 2 bài viết</li>
          <li><span>Khánh An</span> – 1 bài viết</li>
        </ul>
      </div>
    </section>
  </div>
  {/* CTA Section */}
  <section className="cta-section">
    <p>Bạn cũng có một câu chuyện nhỏ dễ thương? Hãy chia sẻ với cộng đồng nhé <i className="fas fa-heart" /></p>
  </section>
</div>

    </div>
  )
}

export default CongDong

