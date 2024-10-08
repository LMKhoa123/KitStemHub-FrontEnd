import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavbarUser from "../../components/navbar/navbaruser/NavbarUser";

function ProfilePage() {
  return (
    <div className="w-full h-screen">
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
}

export default ProfilePage;
