const ReviewDetails = ({ review }) => {
  return (
    <div className="review-details">
      <h4>{review.title}</h4>
      <p>Score: {review.score}/10</p>
    </div>
  );
};

export default ReviewDetails;
