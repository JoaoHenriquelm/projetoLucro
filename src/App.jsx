import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page404 } from "./pages/Page404";
import { CreateProfits } from "./pages/create-profits";



const router = createBrowserRouter([
  {
    path: "*",
    element: <Page404 />,

  },
  {
    path: "/",
    element: <CreateProfits />,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
