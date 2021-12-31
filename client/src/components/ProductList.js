import React from 'react';
import styled from 'styled-components';
import {popularProducts} from '../data';
import Products from './Products';
import { useState,useEffect} from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';


const Container = styled.div`
    padding :20px;
    display: flex; 
    flex-wrap :wrap;
    justify-content: space-between;
`;

const ProductList = ({category,filters,sort}) => {

    const [products, setProducts] = useState([]);

    const [filterproducts, setFilterProducts] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try{
                const resp = await axios.get(category ? `http://localhost:5000/api/products/getAllProducts?category=${category}` :`http://localhost:5000/api/products/getAllProducts` );
                setProducts(resp.data);
                setFilterProducts(resp.data);
            }
            catch(err)
            {throw err;}
        };
        getProduct();
        
    }, [category]);

    useEffect(() => {
        if(filters)
        {
        setFilterProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)   
            )
        )
          );
        }
      }, [products, category, filters]);

      useEffect(() => {
        if (sort === "newest") {
            setFilterProducts((prev) =>
            [...prev].sort((a, b) => a.created - b.created)
          );
        } else if (sort === "asc") {
            setFilterProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
          );
        } else {
            setFilterProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
          );
        }
      }, [sort]);

    return (
        <Container>
        {filterproducts.map((items) => ( 
            <Products item={items} key={items.id}></Products>
            
        ))}
        </Container>
    )
}

export default ProductList;
