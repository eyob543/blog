import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/Home";
import Login from "./pages/Login";
import BlogDetails, { loader as blogDetailLoader } from "./pages/BlogDetails";
import AddBlog from "./pages/AddBlog";
import Layout from "./components/Layout";
import AuthRequired from "./components/AuthRequired";
import YourBlogs from "./pages/YourBlogs";
import SignUp from "./pages/SignUp";
export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "blog/:id",
          element: <BlogDetails />,
          loader: blogDetailLoader,
        },
        {
          element: <AuthRequired />,
          children: [
            {
              path: "add-blog",
              element: <AddBlog />,
            },
            {
              path: "your-blogs",
              element: <YourBlogs />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
