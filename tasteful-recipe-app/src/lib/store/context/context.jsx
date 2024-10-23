import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const scrollToSearch = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const values = {
    scrollToSearch,
    setInputValue,
    inputValue,
    favorites,
    setFavorites,
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useContextAPI = () => {
  return useContext(Context);
};
