import { useEffect, useState } from 'react';
import ProductCards from './ProductCards';
import '/src/style.css';

const Pagination = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PAGE_SIZE = 10;

    // Fetch all products only once.
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=100');
            const data = await response.json();
            setAllProducts(data.products);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Calculate total pages based on allProducts.length
    const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
    // Calculating the start and end indexes.
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    // Based on the start and end index, slicing the current page records.
    const currentProducts = allProducts.slice(start, end);

    const pageChangeHandler = (pageNo) => {
        setCurrentPage(pageNo);
    };

    return allProducts.length > 0 ? (
        <div className="container">
            <h2>Pagination</h2>
            {/* Displaying the total page numbers. */}
            <div className="page-number-container">
                <button
                    className="page-number"
                    onClick={() => pageChangeHandler(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    {"<"}
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={"page-number" + (i === currentPage ? " active" : "")}
                        onClick={() => pageChangeHandler(i)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="page-number"
                    onClick={() => pageChangeHandler(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    {">"}
                </button>
            </div>
            {/* Showing current page records. */}
            <div className="products">
                {currentProducts.map((product) => (
                    <ProductCards
                        key={product.id}
                        image={product.thumbnail}
                        title={product.title}
                    />
                ))}
            </div>
        </div>
    ) : (
        <h2 className='noRecords'>No records found.</h2>
    );
};

export default Pagination;
