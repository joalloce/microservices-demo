import { useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewContext } from "../hooks/useReviewContext";

const ReviewForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useReviewContext();

  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
    }

    const review = { title, score, user: user.id };
    const response = await fetch("http://localhost:7100/api/reviews/", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError("");
      setTitle("");
      setScore(0);
      setEmptyFields([]);
      dispatch({ type: "CREATE_REVIEW", payload: json });
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a new review</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Score:</label>
      <input
        type="number"
        max="10"
        min="0"
        onChange={(e) => setScore(e.target.value)}
        value={score}
        className={emptyFields.includes("score") ? "error" : ""}
      />
      <button>Add review</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ReviewForm;
