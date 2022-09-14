import { useEffect } from "react";

import ReviewDetails from "../components/ReviewDetails";
import ReviewForm from "../components/ReviewForm";
import { useReviewContext } from "../hooks/useReviewContext";

const Home = () => {
  const { reviews, dispatch } = useReviewContext();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("http://localhost:7100/api/reviews/");

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_REVIEWS", payload: json });
      }
    };
    fetchReviews();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="reviews">
        {reviews && reviews.map((r) => <ReviewDetails key={r.id} review={r} />)}
      </div>
      <ReviewForm />
    </div>
  );
};

export default Home;
