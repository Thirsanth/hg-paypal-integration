// import React, { useContext } from "react";
// import ProductImg from "../../assets/Adults/Product Images/Product Image.png";
// import FullStar from "../../assets/Testimony/Full Star.svg";
// import HollowStar from "../../assets/Testimony/Hollow Star.svg";
// import AddToCartButton from "../Buttons/AddToCartButton";
// import { CartContext } from "../CartContext";

// function ProductMain() {

//      const { addToCart } = useContext(CartContext)
//     const product = {
//       id: 2,
//       name: "Adult Multivitamin Gummies",
//       price: 50,
//       image: ProductImg,
//     };
//   return (
//     <div className="product-main" id="Product">
//       <div className="product-main-img">
//         <img src={ProductImg} alt="Happy Gummies Kids" />
//       </div>
//       <div className="product-main-info">
//         <div className="product-details">
//           <h3>Adult Multivitamin Gummies</h3>
//           <p>$50.00</p>
//           <div className="product-ratings">
//             <div className="ratings-stars">
//               <img src={FullStar} />
//               <img src={FullStar} />
//               <img src={FullStar} />
//               <img src={FullStar} />
//               <img src={HollowStar} />
//             </div>
//             <span>10 Reviews</span>
//           </div>
//           <button className="AddToCartButton"
//           onClick={()=>{
//             addToCart(product);
//           }}
//           >Add to Cart</button>
//           <a
//             href="https://a.co/d/2SsEdSw"
//             target="_blank"
//             className="ProductButton"
//           >
//             Buy Now
//           </a>
//         </div>
//         <div className="product-main-details">
//           <div className="product-main-details-set">
//             <h4>Brand</h4>
//             <p>Happy Gummies</p>
//           </div>
//           <div className="product-main-details-set">
//             <h4>Item Form</h4>
//             <p>Gummy</p>
//           </div>
//           <div className="product-main-details-set">
//             <h4>Primary Supplement Type</h4>
//             <p>
//               Vitamin A , Vitamin C , Vitamin D , Vitamin E , Vitamin B6 ,
//               Vitamin B12 , Folate , Biotin , Calcium , Choline , Iodine , Zinc
//               , Inositol
//             </p>
//           </div>
//           <div className="product-main-details-set">
//             <h4>Diet Type</h4>
//             <p>Gluten Free</p>
//           </div>
//           <div className="product-main-details-set">
//             <h4>Flavor</h4>
//             <p>Strawberry , Cherry , Orange</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductMain;


import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImg from "../../assets/Adults/Product Images/Product Image.png";
import FullStar from "../../assets/Testimony/Full Star.svg";
import HollowStar from "../../assets/Testimony/Hollow Star.svg";
import { CartContext } from "../CartContext";

function ProductMain() {
  const { id } = useParams(); // Get product ID from URL (e.g., /product/:id)
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://hg-paypal-backend.onrender.com/api/products/68652feafb90c354fe9c598c`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.response?.data || err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6 text-black">Loading product...</div>;
  }

  return (
    <div className="product-main" id="Product">
      <div className="product-main-img">
        <img src={ProductImg || product.image} alt={product.title} />
      </div>
      <div className="product-main-info">
        <div className="product-details">
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <div className="product-ratings">
            <div className="ratings-stars">
              <img src={FullStar} />
              <img src={FullStar} />
              <img src={FullStar} />
              <img src={FullStar} />
              <img src={HollowStar} />
            </div>
            <span>10 Reviews</span>
          </div>
          <button
            className="AddToCartButton"
            onClick={() =>
              addToCart({
                id: product._id,
                name: product.title,
                price: product.price,
                image: product.image,
              })
            }
          >
            Add to Cart
          </button>
          <a
            href="https://a.co/d/2SsEdSw"
            target="_blank"
            className="ProductButton"
          >
            Buy Now
          </a>
        </div>

        <div className="product-main-details">
          <div className="product-main-details-set">
            <h4>Brand</h4>
            <p>Happy Gummies</p>
          </div>
          <div className="product-main-details-set">
            <h4>Item Form</h4>
            <p>Gummy</p>
          </div>
          <div className="product-main-details-set">
            <h4>Primary Supplement Type</h4>
            <p>
              Vitamin A, Vitamin C, Vitamin D, Vitamin E, Vitamin B6, Vitamin
              B12, Folate, Biotin, Calcium, Choline, Iodine, Zinc, Inositol
            </p>
          </div>
          <div className="product-main-details-set">
            <h4>Diet Type</h4>
            <p>Gluten Free</p>
          </div>
          <div className="product-main-details-set">
            <h4>Flavor</h4>
            <p>Strawberry, Cherry, Orange</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductMain;
