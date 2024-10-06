import React, { useState, useEffect } from 'react';
import { useOkto, Wallet, WalletData } from "okto-sdk-react";
import { useNavigate } from "react-router-dom";

const OktoNavbar = () => {
  const okto = useOkto();
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<WalletData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('oktoAuthToken');
    if (!token) {
      setError("No auth token found. Please log in again.");
      navigate("/");
      return;
    }

    try {
      const userDetails = await okto?.getUserDetails();
      console.log("User authenticated:", userDetails);
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Authentication failed. Please log in again.");
      localStorage.removeItem('oktoAuthToken');
      navigate("/");
    }
  };

  const handleCreateWallet = async () => {
    if (!okto) {
      setError("Okto context is not available");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await okto.createWallet();
      console.log("Wallet creation result:", result);
      setWallets(result);
    } catch (err: any) {
      console.error("Wallet creation error:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        setError(`Failed to create wallet: ${err.response.data.message || err.message}`);
      } else if (err.request) {
        setError("No response received from server. Please try again.");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('oktoAuthToken');
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Okto Wallet</h1>
        <div>
          {wallets && wallets.wallets.length > 0 ? (
            <div className="flex space-x-4">
              {wallets.wallets.map((wallet, index) => (
                <div key={index} className="bg-gray-100 rounded-md p-2">
                  <p className="font-semibold">{wallet.network_name}</p>
                  <p className="text-sm text-gray-600">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                </div>
              ))}
            </div>
          ) : (
            <button
              onClick={handleCreateWallet}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Create Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default OktoNavbar;