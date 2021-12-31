import React from 'react';
import styled from 'styled-components';
import { categories } from '../data';
import { mobile } from "../responsive";
import CategoryItems from './CategoryItems';

const Container = styled.div`
    display :flex;
    padding : 20px;
    justify-content :space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = () => {
    return (
        <Container>
            {categories.map((items) => (
                <CategoryItems item={items} key={items.id}></CategoryItems>
            ))}
        </Container>
    )
}

export default Categories
