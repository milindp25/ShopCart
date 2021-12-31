import React from 'react'
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductList from '../components/ProductList';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <>
        <Announcement />
        <Navbar />
        <Slider/>
        <Categories/>
        <ProductList/>
        <Newsletter />
        <hr />
        <Footer />
        </>
        
  );
};

export default Home;
