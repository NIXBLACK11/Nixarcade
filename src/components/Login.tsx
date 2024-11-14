import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const okto = useOkto();
  const [_error, setError] = useState<string | null>(null);
  const [loading, _setLoading] = useState(false);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if(!idToken) {
      // console.log("Id token not found");
      return;
    }
     okto?.authenticate(idToken, async (authResponse, error) => {
         if (authResponse) {
           localStorage.setItem('googleToken', authResponse.auth_token);
           navigate("/games");
         } else if (error) {
               console.error("Authentication error:", error);
           }
       });
    };

  return (
    <div>
      {loading ? (
          <div className="text-white">Authenticating...</div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google Login Failed")}
            useOneTap
            theme="filled_black"
            shape="circle"
          />
        )}
    </div>
  );
};