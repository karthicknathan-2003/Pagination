import '/src/style.css'

const ProductCards = ({ id, image, title }) => {
    return (
        <div className="product-card" key={id}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
        </div>
    );
}

export default ProductCards