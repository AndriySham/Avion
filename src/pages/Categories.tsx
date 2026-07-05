import React, { useState, useEffect, useMemo } from "react";

import { getProductsByCategory } from "../services/api";

import { useProducts } from "../context/ProductContext";

import { ProductCard } from "../components/ProductCard/ProductCard";

import type { Product } from "../types";

import "./Categories.css";

type Category = "furniture" | "home-decoration" | "kitchen-accessories" | "";
type SortedCategory = "from-cheapest-to-most-expensive" | "from-most-expensive-to-cheapest" | "";

export function Categories() {
    const { products: initialProducts, isLoading: isInitialLoading, error: initialError } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState<Category>("");
    const [sortedCategory, setSortedCategory] = useState<SortedCategory>("");
    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(12);

    const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
    const [filterError, setFilterError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        const fetchNewCategory = async () => {
            setIsFilterLoading(true);
            setFilterError(null);

            try {
                if (selectedCategory === "") {
                    if (active) setCategoryProducts(initialProducts || []);
                } else {
                    const data = await getProductsByCategory(selectedCategory);
                    if (active) {
                        if (data === null) {
                            setFilterError("Failed to load category products");
                        } else {
                            setCategoryProducts(data);
                        }
                    }
                }
            } catch (err) {
                if (active) setFilterError("Error fetching data");
            } finally {
                if (active) setIsFilterLoading(false);
            }
        };

        fetchNewCategory();

        return () => {
            active = false;
        };
    }, [selectedCategory, initialProducts]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value as Category);
        setVisibleCount(12);
    }

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortedCategory(event.target.value as SortedCategory);
    }

    const sortedList = useMemo(() => {
        let list = [...categoryProducts];
        if (sortedCategory === "from-cheapest-to-most-expensive") {
            list.sort((a, b) => a.price - b.price);
        } else if (sortedCategory === "from-most-expensive-to-cheapest") {
            list.sort((a, b) => b.price - a.price);
        }
        return list;
    }, [categoryProducts, sortedCategory]);

    const processedProducts = sortedList.slice(0, visibleCount);

    const showLoading = isInitialLoading || isFilterLoading;
    const showError = initialError || filterError;

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
                            <option value="">All categories</option>
                        </select>
                    </div>
                    <div className="categories__sorting">
                        <select id="categories-sorting" value={sortedCategory} onChange={handleSort}>
                            <option value="" disabled>Sorting</option>
                            <option value="from-cheapest-to-most-expensive" >Price: Low to High</option>
                            <option value="from-most-expensive-to-cheapest" >Price: High to Low</option>
                            <option value="">None</option>
                        </select>
                    </div>
                </div>

                {showLoading ? (
                    <div>Loading...</div>
                ) : showError ? (
                    <div className="error">Error: {showError}</div>
                ) : (
                    <div className="categories__products-grid">
                        {processedProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                )}

                {categoryProducts.length > visibleCount && (

                    <button
                        className="btn categories__btn"
                        onClick={() => setVisibleCount(prev => prev + 12)}
                    >
                        View collection
                    </button>
                )}
            </div>
        </section>
    )
}