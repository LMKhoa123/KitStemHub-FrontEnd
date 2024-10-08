/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Loading from "./components/Loading";
import AuthPage from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import ProfileInfo from "./components/profile/profileinfo/ProfileInfo";
import ProfileAddress from "./components/profile/profileaddress/ProfileAddress";
import ProfileCart from "./components/profile/profilecart/ProfileCart";
import ProfileLab from "./components/profile/profilelab/ProfileLab";
import HomePageUser from "./pages/homepage/HomePageUser";
import HomePageRegister from "./pages/homepage/HomePageRegister";
import CartPage from "./pages/cartpage/CartPage";
import ProductDetailPage from "./pages/productdetailpage/ProductDetailPage";
import CheckOutPage from "./pages/checkoutpage/CheckOutPage";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn ? <Navigate to="/home" /> : children;
};

function App() {
  const isLoggedIn = () => !!localStorage.getItem("token");
  console.log(isLoggedIn());

  return (
    <AuthProvider>
      {/* {/* children trong AuthProvider đại diện cho toàn bộ nội dung của ứng dụng được bao bọc bởi AuthProvider đảm bảo rằng tất cả các components con đều có thể truy cập vào context xác thực. */}
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                {/* //children */}
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route path="/" element={<HomePageRegister />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                {/* //children */}
                <HomePageUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {/* //children */}
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileInfo />} />
            <Route path="address" element={<ProfileAddress />} />
            <Route path="cart" element={<ProfileCart />} />
            <Route path="lab" element={<ProfileLab />} />
          </Route>

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/productdetail/:kitId" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
