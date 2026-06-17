import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Counselling from "../pages/Counselling/Counselling";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CollegePredictor from "../pages/CollegePredictor/CollegePredictor";
import Profile from "../pages/Profile/Profile";
import Admin from "../pages/Admin/Admin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import MockTests from "../pages/MockTests/MockTests";
import MockExam from "../pages/MockExam/MockExam";
import MockResult from "../pages/MockResult/MockResult";
import ReviewAnswers from "../pages/ReviewAnswers/ReviewAnswers";
/* Normal User Protection */

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  return user
    ? children
    : <Navigate to="/login" />;
}

/* Admin Protection */

function ProtectedAdminRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return user?.role === "admin"
    ? children
    : <Navigate to="/" />;
}

function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/counselling"
        element={<Counselling />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/college-predictor"
        element={
          <ProtectedRoute>
            <CollegePredictor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />

      <Route path="/mock-tests" element={<MockTests />} />

<Route
  path="/mock-exam/:id"
  element={<MockExam />}
/>

<Route
  path="/mock-result/:id"
  element={<MockResult />}
/>
<Route
  path="/review-answers"
  element={<ReviewAnswers />}
/>

    </Routes>
  );
}

export default AppRoutes;