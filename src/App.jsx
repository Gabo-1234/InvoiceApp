import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeadNavigation from "./Components/Navigations/HeadNavigation";
import SideNav from "./Components/Navigations/SideNavigation";
import "./index.css";
import "./Components/Css/SideNavigation.css"
function App() {

  return (
    <>
      <BrowserRouter>
        <HeadNavigation />
        <SideNav/>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/Invoice/:id" element={<h1>InvoicePage</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
