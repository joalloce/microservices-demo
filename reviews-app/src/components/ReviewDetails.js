import { useReviewContext } from "../hooks/useReviewContext";

const ReviewDetails = ({ review }) => {
  const { dispatch } = useReviewContext();

  const handleClick = async () => {
    const res = await fetch("http://localhost:7100/api/reviews/" + review.id, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch({ type: "DELETE_REVIEW", payload: review });
    }
  };
  return (
    <div className="review-details">
      <h4>{review.title}</h4>
      <p>Score: {review.score}/10</p>
      <span className="material-icons" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ReviewDetails;
