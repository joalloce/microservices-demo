import { useEffect, useState } from "react";

import ReviewDetails from "../components/ReviewDetails";

const Home = () => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("http://localhost:7100/api/reviews/");
      const json = await response.json();
      if (response.ok) {
        setReviews(json);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="home">
      <div className="reviews">
        {reviews && reviews.map((r) => <ReviewDetails key={r.id} review={r} />)}
      </div>
    </div>
  );
};

export default Home;
