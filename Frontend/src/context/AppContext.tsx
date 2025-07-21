import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Set Axios base URL and credentials
axios.defaults.baseURL = "https://blogbreezebackend.onrender.com";
axios.defaults.withCredentials = true;

// Define Blog type (adjust fields as per your API)
interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// Context type with proper Blog typing
interface AppContextType {
  axios: typeof axios;
  navigate: ReturnType<typeof useNavigate>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

interface AppProviderProps {
  children: ReactNode;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [input, setInput] = useState("");

  // Fetch blogs function
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Check auth on mount
 useEffect(() => {
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/admin/check-auth");
      if (data.success) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      setIsLogin(false);
    }
  };
  checkAuth();
}, []);


  // Fetch blogs once on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const value: AppContextType = {
    axios,
    navigate,
    isLogin,
    setIsLogin,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
