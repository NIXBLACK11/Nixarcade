import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRecoilState } from "recoil";
import { authState } from "../atom";
import axios from "axios";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const okto = useOkto();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useRecoilState(authState);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if(!idToken) {
      console.log("Id token not found");
      return;
    }
     okto?.authenticate(idToken, async (authResponse, error) => {
         if (authResponse) {
           setAuthToken(authResponse.auth_token);

           console.log("Authenticated successfully, auth token:", authResponse.auth_token);
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