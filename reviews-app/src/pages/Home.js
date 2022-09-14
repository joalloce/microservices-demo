import { useEffect } from "react";

import ReviewDetails from "../components/ReviewDetails";
import ReviewForm from "../components/ReviewForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewContext } from "../hooks/useReviewContext";

const Home = () => {
  const { reviews, dispatch } = useReviewContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("http://localhost:7100/api/reviews/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_REVIEWS", payload: json });
      }
    };

    // auth
    if (user) fetchReviews();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="reviews">
        {(!reviews || !reviews.length) && <h3>No reviews :(</h3>}
        {reviews && reviews.map((r) => <ReviewDetails key={r.id} review={r} />)}
      </div>
      <ReviewForm />
    </div>
  );
};

export default Home;
