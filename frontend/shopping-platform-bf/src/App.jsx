import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import CartButton from "./components/CartButton";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1f2937",
            color: "#fff",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />

      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-product"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <CartButton />
      </div>
    </Router>
  );
}

export default App;