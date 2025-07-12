import React from 'react';
import Home from '../components/Home/Home'; 
// import TopRatedProducts from "../components/allproducts/TopRatedProducts";
import ContactUs from '../components/Home/ContactUs';
const Homes = () => {
  return (
    <div>
      <Home />
      {/* <TopRatedProducts /> */}
      
      <ContactUs/>
    </div>
  );
};

export default Homes;
