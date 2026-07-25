import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Categories } from "./pages/Categories";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Login } from "./pages/Login";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
