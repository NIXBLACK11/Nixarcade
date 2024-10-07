import axios from 'axios';

export const generateToken = async (publicKey: string, success: boolean, apiSecret: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      'https://nixarcade-backend.vercel.app/generate-token',
      { publicKey, success },
      {
        headers: {
          'x-api-secret': apiSecret, // Pass the API secret for verification
        },
      }
    );
    return response.data.token; // Return the generated token
  } catch (error: any) {
    console.error('Error generating token:', error.response?.data || error.message);
    return null; // Return null if the request fails
  }
};
