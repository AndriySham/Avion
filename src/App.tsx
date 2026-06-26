import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductGrid } from "./components/ProductGrid/ProductGrid";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
