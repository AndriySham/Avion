import React, { useState } from "react";

import { useProducts } from "../context/ProductContext";

import { ProductCard } from "../components/ProductCard/ProductCard";

import "./Categories.css";

type Category = "furniture" | "home-decoration" | "kitchen-accessories" | "";
type SortedCategory = "from-cheapest-to-most-expensive" | "from-most-expensive-to-cheapest" | "";

export function Categories() {
    const { products, isLoading, error } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState<Category>("");
    const [sortedCategory, setSortedCategory] = useState<SortedCategory>("");
    // const [sortBy, setSortBy] = useState<Product | >([]);


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value as Category)
    }

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortedCategory(event.target.value as SortedCategory);
    }

    return (
        <section className="categories">
            <div className="banner"></div>
            <div className="container">
                <div className="categories__selection">
                    <div className="categories__filters">
                        <select id="categories-select" value={selectedCategory} onChange={handleSelect}>
                            <option value="" disabled hidden>Filters</option>
                            <option value="furniture">Furniture</option>
                            <option value="home-decoration">Home decoration</option>
                            <option value="kitchen-accessories">Kitchen-accessories</option>
                        </select>
                    </div>
                    <div className="categories__sorting">
                        <select id="categories-sorting" value={sortedCategory} onChange={handleSort}>
                            <option value="" disabled>Sorting</option>
                            <option value="from-cheapest-to-most-expensive">Price: Low to High</option>
                            <option value="from-most-expensive-to-cheapest">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* <div className="categories__products-grid"> */}

                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="error">Error: {error}</div>
                ) : (
                    <div className="categories__products-grid">
                        {products.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                )}
                {/* </div> */}

                <button className="btn categories__btn">View collection</button>
            </div>
        </section>
    )
}