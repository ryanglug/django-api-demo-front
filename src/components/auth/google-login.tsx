import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const loginUser = useAuthStore((state) => state.loginAuth);
  const navigate = useNavigate();

  const handleSuccess = async (credential: CredentialResponse) => {
    const idToken = credential.credential;

    try {
      const res = await authApi.post("login/google/", { id_token: idToken });

      const token = res.data.access;
      loginUser(token);
      navigate("/signed-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Login failed")}
        shape="rectangular"
        size="large"
        theme="outline"
        width={200}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
