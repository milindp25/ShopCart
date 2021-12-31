import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from '../API_Request_Call';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { addProduct } from '../redux/reduxCart';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
margin-left: 10px;
padding: 5px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const FilterColorOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;
const SingleProduct = () => {

  const id = useLocation().pathname.split("/product/")[1];
  console.log(id);
  const [product,setProduct] = useState({});
  const [cartedQuantity,setcartedQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/product/find?id=${id}`);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantityChange=(type) =>{
    if(type ==='Minus')
      cartedQuantity > 1 && setcartedQuantity(cartedQuantity-1);
    else 
    setcartedQuantity(cartedQuantity + 1); 
  }

  const handleCartClick = () =>{
    if(color ==='' || size ==='')
    {swal("Enter the deatils to proceede");}
    else
    dispatch(
      addProduct({...product, cartedQuantity, color, size})
    )
    
  };

    return (
     
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product[0] ? product[0].image : product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product[0] ? product[0].title : product.title}</Title>
          <Desc>
            {product[0] ? product[0].description : product.description}
          </Desc>
          <Price>${product[0] ? product[0].price : product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
             
                <FilterColor onChange={(e) => {setColor(e.target.value)}}>
                <FilterColorOption disabled selected>Color</FilterColorOption> 
                {product[0] ? product[0].color.split(",").map((color) =>
                (<FilterColorOption key={color}>
                  {color}
                </FilterColorOption> )): "test"} </FilterColor>
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
              <FilterSizeOption disabled selected>Size</FilterSizeOption>
              {product[0] ? product[0].size.split(",").map((size) => (
                <FilterSizeOption key={size}>{size}</FilterSizeOption>
              )): "test"}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantityChange("Minus")}/>
              <Amount>{cartedQuantity}</Amount>
              <Add onClick={() => handleQuantityChange("Add") }/>
            </AmountContainer>
            <Button onClick={handleCartClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default SingleProduct;
