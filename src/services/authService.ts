// authService.ts
interface LoginResponse {
    token: string;
    user: UserInfo;
  }

  interface UserInfo {
    id: number;
    name: string;
    email: string;
    image: string | null; // Image can be null
    phone: string;
    status: number;
    email_verified_at: string | null; // Can be null
    created_at: string; // ISO date string
    updated_at: string | null; // Can be null
    user_vercode: string | null; // Can be null, add if applicable
  }
  
  
  interface RegisterResponse {
    message: string;
  }
  
  const authService = {
    login: async (values:any): Promise<LoginResponse> => {
      try {
        const response = await fetch("https://tizaraa.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) throw new Error("Login failed");
  
        const data: LoginResponse = await response.json();
        localStorage.setItem("token",  data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user)); // Storing userInfo as a JSON string
        return data;
      } catch (error) {
        console.error("Error in login:", error);
        throw error;
      }
    },
  
    logout: (): void => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  
    register: async (email: string, password: string): Promise<RegisterResponse> => {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) throw new Error("Registration failed");
  
        const data: RegisterResponse = await response.json();
        return data;
      } catch (error) {
        console.error("Error in registration:", error);
        throw error;
      }
    },
  
    getToken: (): string | null => {
      return localStorage.getItem("token");
    },
  
    isAuthenticated: (): boolean => {
      const token = localStorage.getItem("token");
      return !!token; // Check if token exists
    },
  };
  
  export default authService;
  