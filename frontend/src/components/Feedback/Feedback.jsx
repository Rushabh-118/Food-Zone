import React, { useState } from 'react'
import './Feedback.css'

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: 0,
        comments: "",
      });
    
      const [submitted, setSubmitted] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleRating = (rating) => {
        setFormData({ ...formData, rating });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted: ", formData);
        setSubmitted(true);
      };

      return (
        <>
        <div className="hr" id = 'feedback'>
            <hr />
        </div>
        <div className="feedback-container">
          {/* Left Side Image */}
          <div className="feedback-image">
            <img
              src="https://th.bing.com/th/id/OIP.F4KQzvuDXfFlO8WuJpvo9gHaHS?rs=1&pid=ImgDetMain "
              alt="Delicious Food"
            />
          </div>
    
          {/* Right Side Form */}
          <div className="feedback-form">
            <h2>Feedback Form</h2>
            {submitted ? (
              <div className="feedback-thank-you">
                <h3>Thank you for your feedback!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRating(star)}
                        className={formData.rating >= star ? "star selected" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
    
                <div className="form-group">
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
    
                <button type="submit" className="submit-btn">
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
          
        </div>
        </>
      );
}

export default Feedback
