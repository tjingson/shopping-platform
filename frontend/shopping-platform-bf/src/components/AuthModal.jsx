import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


function AuthModal() {
  const { showAuthModal, closeAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeAuthModal]);

  if (!showAuthModal) return null;

  // 🔥 navigate to login
  const handleLogin = () => {
    closeAuthModal();
    navigate("/login");
  };

  const onClose = () => {
    closeAuthModal();
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg w-80 text-center">
        <h2 className="text-lg font-bold mb-2">
          Login Required
        </h2>
        <p className="text-gray-500 mb-4">
          Please login to continue
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Go to Login
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-gray-400 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default AuthModal;