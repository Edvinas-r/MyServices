import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import AuthPage from '../pages/AuthPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import PublicHomePage from '../pages/PublicHomePage';
import UserHomePage from '../pages/UserHomePage';
import AdminHomePage from '../pages/AdminHomePage';
import ServiceDetailsPage from '../components/Services/ServiceDetailsPage';
import SignUpForm from '../components/Auth/SignUpForm';
import AddServiceForm from '../pages/AddServiceForm';
import UpdateServiceForm from '../pages/UpdateServiceForm';
import Footer from '../components/Footer/Footer';
import AddCategoryForm from '../pages/AddCategoryForm';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            {/* Vieši puslapiai */}
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/service/:id" element={<ServiceDetailsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/signup" element={<SignUpForm />} />

            {/* Vartotojo (user) puslapiai */}
            <Route
              path="/user"
              element={
                <ProtectedRoute allowedRoles={[1]}>
                  <UserHomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/add-service"
              element={
                <ProtectedRoute allowedRoles={[1]}>
                  <AddServiceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/update-service/:id"
              element={
                <ProtectedRoute allowedRoles={[1]}>
                  <UpdateServiceForm />
                </ProtectedRoute>
              }
            />

            {/* Administratoriaus (admin) puslapiai */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <AdminHomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-service"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <AddServiceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/update-service/:id"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <UpdateServiceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-category"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <AddCategoryForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
