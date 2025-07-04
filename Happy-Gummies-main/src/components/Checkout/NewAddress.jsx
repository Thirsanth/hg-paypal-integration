// import React from "react";

// function NewAddress() {
//   return (
//     <form className="new-address">
//       <div className="new-address-container">
//         <div className="new-address-section">
//           <h2>Contact Details</h2>
//           <div className="new-address-section-container">
//             <div className="new-address-section-divide">
//               <section>
//                 <label>
//                   First Name <span>*</span>
//                 </label>
//                 <input />
//               </section>
//               <section>
//                 <label>
//                   Last Name <span>*</span>
//                 </label>
//                 <input />
//               </section>
//             </div>
//             <section>
//               <label>
//                 Email <span>*</span>
//               </label>
//               <input />
//             </section>
//             <section>
//               <label>Phone Number </label>
//               <input />
//             </section>
//           </div>
//         </div>
//         <div className="new-address-section">
//           <h2>Shipping Details</h2>
//           <div className="new-address-section-container">
//             <section>
//               <label>Flat/House no.</label>
//               <input />
//             </section>
//             <section>
//               <label>Address</label>
//               <input />
//             </section>
//             <div className="new-address-section-divide">
//               <section>
//                 <label>City</label>
//                 <input />
//               </section>
//               <section>
//                 <label>State</label>
//                 <input />
//               </section>
//             </div>
//             <div className="new-address-section-divide">
//               <section>
//                 <label>Postal Code</label>
//                 <input />
//               </section>
//               <section>
//                 <label>Landmark</label>
//                 <input />
//               </section>
//             </div>
//             <section className="checkbox">
//               <input type="checkbox" />
//               <label>My shipping and Billing address are the same</label>
//             </section>
//           </div>
//         </div>
//         <div className="new-address-section">
//           <h2>Billing Details</h2>
//           <div className="new-address-section-container">
//             <section>
//               <label>Flat/House no.</label>
//               <input />
//             </section>
//             <section>
//               <label>Address</label>
//               <input />
//             </section>
//             <div className="new-address-section-divide">
//               <section>
//                 <label>City</label>
//                 <input />
//               </section>
//               <section>
//                 <label>State</label>
//                 <input />
//               </section>
//             </div>
//             <div className="new-address-section-divide">
//               <section>
//                 <label>Postal Code</label>
//                 <input />
//               </section>
//               <section>
//                 <label>Landmark</label>
//                 <input />
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button className="ProductButton">Save & Next</button>
//     </form>
//   );
// }

// export default NewAddress;


import React, { useState } from "react";

function NewAddress({ onSave }) {
  const [formData, setFormData] = useState({
    contact: { firstName: '', lastName: '', email: '', phone: '' },
    shipping: { house: '', addressLine: '', city: '', state: '', postalCode: '', landmark: '' },
    billing: { house: '', addressLine: '', city: '', state: '', postalCode: '', landmark: '' },
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCheckbox = () => {
    setSameAsShipping(prev => !prev);
    if (!sameAsShipping) {
      setFormData(prev => ({
        ...prev,
        billing: { ...prev.shipping }
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="new-address" onSubmit={handleSave}>
      <div className="new-address-container">
        {/* Contact Details */}
        <div className="new-address-section">
          <h2>Contact Details</h2>
          <div className="new-address-section-container">
            <div className="new-address-section-divide">
              <section>
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  value={formData.contact.firstName}
                  onChange={e => handleChange('contact', 'firstName', e.target.value)}
                />
              </section>
              <section>
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  value={formData.contact.lastName}
                  onChange={e => handleChange('contact', 'lastName', e.target.value)}
                />
              </section>
            </div>
            <section>
              <label>
                Email <span>*</span>
              </label>
              <input
                value={formData.contact.email}
                onChange={e => handleChange('contact', 'email', e.target.value)}
              />
            </section>
            <section>
              <label>Phone Number</label>
              <input
                value={formData.contact.phone}
                onChange={e => handleChange('contact', 'phone', e.target.value)}
              />
            </section>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="new-address-section">
          <h2>Shipping Details</h2>
          <div className="new-address-section-container">
            <section>
              <label>Flat/House no.</label>
              <input
                value={formData.shipping.house}
                onChange={e => handleChange('shipping', 'house', e.target.value)}
              />
            </section>
            <section>
              <label>Address</label>
              <input
                value={formData.shipping.addressLine}
                onChange={e => handleChange('shipping', 'addressLine', e.target.value)}
              />
            </section>
            <div className="new-address-section-divide">
              <section>
                <label>City</label>
                <input
                  value={formData.shipping.city}
                  onChange={e => handleChange('shipping', 'city', e.target.value)}
                />
              </section>
              <section>
                <label>State</label>
                <input
                  value={formData.shipping.state}
                  onChange={e => handleChange('shipping', 'state', e.target.value)}
                />
              </section>
            </div>
            <div className="new-address-section-divide">
              <section>
                <label>Postal Code</label>
                <input
                  value={formData.shipping.postalCode}
                  onChange={e => handleChange('shipping', 'postalCode', e.target.value)}
                />
              </section>
              <section>
                <label>Landmark</label>
                <input
                  value={formData.shipping.landmark}
                  onChange={e => handleChange('shipping', 'landmark', e.target.value)}
                />
              </section>
            </div>
            <section className="checkbox">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={handleCheckbox}
              />
              <label>My shipping and Billing address are the same</label>
            </section>
          </div>
        </div>

        {/* Billing Details */}
        <div className="new-address-section">
          <h2>Billing Details</h2>
          <div className="new-address-section-container">
            <section>
              <label>Flat/House no.</label>
              <input
                value={formData.billing.house}
                onChange={e => handleChange('billing', 'house', e.target.value)}
              />
            </section>
            <section>
              <label>Address</label>
              <input
                value={formData.billing.addressLine}
                onChange={e => handleChange('billing', 'addressLine', e.target.value)}
              />
            </section>
            <div className="new-address-section-divide">
              <section>
                <label>City</label>
                <input
                  value={formData.billing.city}
                  onChange={e => handleChange('billing', 'city', e.target.value)}
                />
              </section>
              <section>
                <label>State</label>
                <input
                  value={formData.billing.state}
                  onChange={e => handleChange('billing', 'state', e.target.value)}
                />
              </section>
            </div>
            <div className="new-address-section-divide">
              <section>
                <label>Postal Code</label>
                <input
                  value={formData.billing.postalCode}
                  onChange={e => handleChange('billing', 'postalCode', e.target.value)}
                />
              </section>
              <section>
                <label>Landmark</label>
                <input
                  value={formData.billing.landmark}
                  onChange={e => handleChange('billing', 'landmark', e.target.value)}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="ProductButton">Save & Next</button>
    </form>
  );
}

export default NewAddress;
