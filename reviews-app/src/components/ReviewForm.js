import { useState } from "react";

import { useReviewContext } from "../hooks/useReviewContext";

const ReviewForm = () => {
  const { dispatch } = useReviewContext();
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = 1; //have to change later
    const review = { title, score, user };
    const response = await fetch("http://localhost:7100/api/reviews/", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
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
      <h3>Add new review</h3>
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
