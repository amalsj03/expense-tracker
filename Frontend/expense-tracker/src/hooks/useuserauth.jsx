import { useContext, useEffect } from "react";
import { UserContext } from "../context/usercontext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apipath";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return; // ✅ Already logged in → no need to fetch

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data); // ✅ Update context with user data
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);

        if (isMounted) {
          clearUser();
          navigate("/login"); // ✅ Redirect to login
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false; // ✅ Cleanup to avoid memory leaks
    };
  }, [user, updateUser, clearUser, navigate]); // ✅ Proper dependency array
};
