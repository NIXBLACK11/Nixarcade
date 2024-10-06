import { useOkto, WalletData } from "okto-sdk-react";
import { useState } from 'react';
 
export const Home = () => {
  const [walletDetails, setWalletDetails] = useState<WalletData>();
  const [error, setError] = useState<string>("");
  const okto = useOkto();
 
  const fetchUserDetails = async () => {
    try {
      const details = await okto?.getWallets();
      if(details) setWalletDetails(details);
    } catch (error: any) {
      setError(`Failed to fetch user details: ${error.message}`);
    }
  };
 
  return (
    <div>
      {error && <div>{error}</div>}
      <h1>Home Page</h1>
      <button onClick={fetchUserDetails}>View User Details</button>
      {walletDetails && (
        <div>
          <h2>Wallet Details:</h2>
          <pre>{JSON.stringify(walletDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}