// import React, { useContext } from "react";
// import Kids from "../../assets/Home/Products/Kids.png";
// import Adults from "../../assets/Home/Products/Adults.png";
// import FullStar from "../../assets/Home/Products/Full Star.png";
// import HollowStar from "../../assets/Home/Products/Hollow Star.png";
// import ProductButton from "../Buttons/ProductButton";
// import { CartContext } from "../CartContext";

// function Products() {

//    const { addToCart } = useContext(CartContext)
//     const productKid = {
//       id: 1,
//       name: "Kids Multivitamin Gummies",
//       price: 50,
//       image: Kids,
//     };

//         const productAdult = {
//           id: 2,
//           name: "Adult Multivitamin Gummies",
//           price: 50,
//           image: Adults,
//         };

//   return (
//     <div className="section-container" id="products">
//       <div className="heading">
//         <h2>Our Gummies, Your Joyful Journey</h2>
//         <p>Where Health Meets Happiness in Every Bite</p>
//       </div>
//       <div className="products">
//         <div className="products-card">
//           <img src={Kids} alt="Happy Gummies Kids Product" />
//           <div className="product-details">
//             <h3>Kids Multivitamin Gummies</h3>
//             <p>$00.0</p>
//             <div className="product-ratings">
//               <div className="ratings-stars">
//                 <img src={FullStar} />
//                 <img src={FullStar} />
//                 <img src={FullStar} />
//                 <img src={FullStar} />
//                 <img src={HollowStar} />
//               </div>
//               <span>10 Reviews</span>
//             </div>
//             <button className="AddToCartButton" onClick={()=>{
//               addToCart(productKid);
//             }}>Add to Cart</button>
//             <ProductButton toLink="/kids" text="Know More" />
//           </div>
//         </div>
//         <div className="products-card">
//           <img src={Adults} alt="Happy Gummies Adults Product" />
//           <div className="product-details">
//             <div className="sold-label-container">
//               <p>Sold Out</p>
//             </div>
//             <h3>Adult Multivitamin Gummies</h3>
//             <p>$00.0</p>
//             <div className="product-ratings">
//               <div className="ratings-stars">
//                 <img src={FullStar} />
//                 <img src={FullStar} />
//                 <img src={FullStar} />
//                 <img src={FullStar} />
//                 <img src={HollowStar} />
//               </div>
//               <span>10 Reviews</span>
//             </div>
//             <button className="AddToCartButton" onClick={()=>{
//               addToCart(productAdult);
//             }}>
//               Add to Cart
//             </button>
//             <a className="ComingSoon">Out of Stock</a>
//             <ProductButton toLink="/adults" text="Know More" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FullStar from "../../assets/Home/Products/Full Star.png";
import HollowStar from "../../assets/Home/Products/Hollow Star.png";
import ProductButton from "../Buttons/ProductButton";
import { CartContext } from "../CartContext";

function Products() {
  const { addToCart } = useContext(CartContext);

  const [kidsProduct, setKidsProduct] = useState(null);
  const [adultsProduct, setAdultsProduct] = useState(null);

  // 🧠 Replace with actual MongoDB ObjectIDs or custom IDs
  const KIDS_PRODUCT_ID = "68652babfb90c354fe9c58b5";
  const ADULTS_PRODUCT_ID = "68652feafb90c354fe9c598c";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [kidsRes, adultsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${KIDS_PRODUCT_ID}`),
          axios.get(`http://localhost:5000/api/products/${ADULTS_PRODUCT_ID}`),
        ]);

        setKidsProduct(kidsRes.data);
        setAdultsProduct(adultsRes.data);
      } catch (error) {
        console.error("Failed to fetch products:", error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, []);

  if (!kidsProduct || !adultsProduct) {
    return <div className="text-black p-4">Loading products...</div>;
  }

  return (
    <div className="section-container" id="products">
      <div className="heading">
        <h2>Our Gummies, Your Joyful Journey</h2>
        <p>Where Health Meets Happiness in Every Bite</p>
      </div>

      <div className="products">
        {/* Kids Product */}
        <div className="products-card">
          <img src={kidsProduct.image} alt={kidsProduct.title} />
          <div className="product-details">
            <h3>{kidsProduct.title}</h3>
            <p>${kidsProduct.price.toFixed(2)}</p>
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
                  id: kidsProduct._id,
                  name: kidsProduct.title,
                  price: kidsProduct.price,
                  image: kidsProduct.image,
                })
              }
            >
              Add to Cart
            </button>
            <ProductButton toLink={`/product/${kidsProduct._id}`} text="Know More" />
          </div>
        </div>

        {/* Adults Product */}
        <div className="products-card">
          <img src={adultsProduct.image} alt={adultsProduct.title} />
          <div className="product-details">
            {adultsProduct.stockQty === 0 && (
              <div className="sold-label-container">
                <p>Sold Out</p>
              </div>
            )}
            <h3>{adultsProduct.title}</h3>
            <p>${adultsProduct.price.toFixed(2)}</p>
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
                  id: adultsProduct._id,
                  name: adultsProduct.title,
                  price: adultsProduct.price,
                  image: adultsProduct.image,
                })
              }
              disabled={adultsProduct.stockQty === 0}
            >
              {adultsProduct.stockQty === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            {adultsProduct.stockQty === 0 && <a className="ComingSoon">Out of Stock</a>}
            <ProductButton toLink={`/product/${adultsProduct._id}`} text="Know More" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
