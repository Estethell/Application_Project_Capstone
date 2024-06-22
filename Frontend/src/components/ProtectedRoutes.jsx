import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => navigate("/"));
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/joboffer" />;
};

export default ProtectedRoutes;
