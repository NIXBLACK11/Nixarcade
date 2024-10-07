import axios from 'axios';
export const verifyToken = async (token: string, apiSecret: string): Promise<void> => {
    try {
      const response = await axios.post(
        'https://nixarcade-backend-4s3w6g3hv-nixblacks-projects.vercel.app//verify-token',
        { token },
        {
          headers: {
            'x-api-secret': apiSecret,
          },
        }
      );
  
      if (response.data.verified) {
        console.log('Token verified:', response.data);
      } else {
        console.log('Invalid token:', response.data.message);
      }
    } catch (error: any) {
      console.error('Error verifying token:', error.response?.data || error.message);
    }
  };
  
//   // Example usage:
//   const token = 'yourJWTToken';
//   verifyToken(token, 'apisecret');
  