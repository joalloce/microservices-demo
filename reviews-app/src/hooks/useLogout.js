import { useAuthContext } from "./useAuthContext";
import { useReviewContext } from "./useReviewContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: reviewDispatch } = useReviewContext();

  const logout = () => {
    localStorage.removeItem("user");

    authDispatch({ type: "LOGOUT", payload: null }); //logout
    reviewDispatch({ type: "SET_REVIEWS", payload: null }); // set review to null
  };

  return { logout };
};
