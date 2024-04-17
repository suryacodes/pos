import api from "./Api";

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

const authService = {
  signIn: async (signInData: SignInData): Promise<SignInResponse> => {
    return api.post("/signin", signInData);
  },
};

export default authService;
