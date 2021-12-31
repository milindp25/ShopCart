
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';


const Container = styled.div`
    flex : 1 ;
    margin :3px;
    height :70vh;
  position: relative;
`;

const Image = styled.img`
    width : 100%;
    height :100%;
    object-fit: cover;
  ${mobile({ height: "20vh" })}
    
`;

const Info = styled.div`
    position : absolute;
    top: 140px;
    width : 100%;
    height :100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: black;
    color:white;
    cursor: pointer;
    font-weight: 600;
`;

/* Checked if item is passing as a object. If Yes, fecthed values in a different way*/

const CategoryItems = ({item}) => {
    return (
        <Container>
            <Link to={`/products/${item.category}`}>
            <Image src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button> Shop NOW</Button>
            </Info>
            </Link>
        </Container>
    )
}

export default CategoryItems;
