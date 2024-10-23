import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { ContextProvider } from "./lib/store/context/context.jsx";
import RecipesPage from "./page/RecipePage/RecipesPage.jsx";
import HomePage from "./page/HomePage/HomePage.jsx";
import AboutPage from "./page/About/AboutPage.jsx";
import ContactPage from "./page/Contact/ContactPage.jsx";
import FavoritesPage from "./page/favorites/FavoritesPage.jsx";
import RecipeDetails from "./page/RecipePage/RecipeDetails/RecipeDetails.jsx";
import SearchPage from "./page/SearchPage/SearchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Wraps the Navbar and routes
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/recipes/:recipeID",
        element: <RecipeDetails />,
      },
      {
        path: "/About",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
