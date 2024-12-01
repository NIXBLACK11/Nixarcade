import axios from 'axios';

export const createUser = async (user_id: string | undefined, email: string | undefined, address: string | undefined): Promise<boolean>=> {
    if(!user_id || !email || !address) return false;

    const userData = {
        user_id: user_id,
        email: email,
        address: address
    };

    try {
        const response = await axios.post('https://nixarcade-backend.vercel.app/user/createUser', userData);
        if(response.status!=200) {
            console.log("User not created");
            return false;
        } else {
            console.log("User created");
            return true;
        }
    } catch (error) {
        return false;
    }
}

export const userExists = async (user_id: string | undefined): Promise<boolean> => {
    if(!user_id) return false;

    const userData = {
        user_id: user_id
    }

    try {
        const response = await axios.post('https://nixarcade-backend.vercel.app/user/userExists', userData);
        if(response.status!=200) {
            console.log("User not found");
            return false;
        } else {
            console.log("User found");
            return true;
        }
    } catch (error) {
        return false;
    }
}

export const setValidGameTrue = async (address: string): Promise<void> => {
    try {
      const response = await axios.post(`https://nixarcade-backend.vercel.app/user/setValidGameTrue`, { address });
      console.log(response.data.message);
    } catch (error: any) {
      console.error("Error setting valid game to true:", error.response?.data || error.message);
    }
};

export const setValidGameFalse = async (address: string): Promise<void> => {
    try {
      const response = await axios.post(`https://nixarcade-backend.vercel.app/user/setValidGameFalse`, { address });
      console.log(response.data.message);
    } catch (error: any) {
      console.error("Error setting valid game to false:", error.response?.data || error.message);
    }
  };
  
export const checkGameValid = async (address: string): Promise<boolean> => {
    try {
      const response = await axios.get(`https://nixarcade-backend.vercel.app/user/isGameValid`, { params: { address } });
      return response.data.isValid;
    } catch (error: any) {
      return false;
    }
  };