import Main from "./pages/Mainpage/Main";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  // const Layout = () => {
  //   return (
  //     <div className="main">
  //       <Header />
  //       <div className="container">
  //         <div className="menuContainer">
  //           {" "}
  //           <SideBar />
  //         </div>
  //         <div className="contentContainer">
  //           <Outlet />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Main />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
