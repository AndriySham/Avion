import { ProductCard } from "./components/ProductCard/ProductCard"
import im from "./assets/Browse-1-2.png"

function App() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2A254B' }}>Avion Furniture Store</h1>
      <p style={{ color: '#726E8D' }}>Ласкаво просимо! Проєкт успішно очищено та готовий до роботи.</p>

      <ProductCard key={mockProduct.id} product={mockProduct} />
    </div>
  )
}

export default App


const mockProduct = {
  id: 1,
  title: "Test Chair",
  price: 250,
  description: "Test description",
  category: "furniture",
  // thumbnail: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop",
  thumbnail: im,
  images: []
};