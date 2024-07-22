import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes";

// Importing pages
import Settings from "./features/settings/Settings";
import Questions from "./features/questions/Questions";
import FinalScore from "./features/final-score/FinalScore";
import RoutingError from "./ui/RoutingError";

// Importing component to solve scroll to top problem
import ScrollToTop from "./utils/ScrollToTop";

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RoutingError />,
    children: [
      {
        path: routes.settings,
        element: <Settings />,
      },
      {
        path: routes.questions,
        element: <Questions />,
      },
      {
        path: routes.finalScore,
        element: <FinalScore />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
