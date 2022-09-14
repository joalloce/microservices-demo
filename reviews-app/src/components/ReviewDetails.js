import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewContext } from "../hooks/useReviewContext";

const ReviewDetails = ({ review }) => {
  const { user } = useAuthContext();
  const { dispatch } = useReviewContext();

  const handleClick = async () => {
    //auth
    if (!user) return;

    const res = await fetch("http://localhost:7100/api/reviews/" + review.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
