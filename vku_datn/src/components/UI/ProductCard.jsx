import React from 'react'
import {motion} from 'framer-motion'
import '../../styles/product-card.css'
import {Container, Row, Col} from "reactstrap"
import {Link} from "react-router-dom"
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import { cartActions } from '../../redux/slices/cartSlice'
import useGetData from "../../custom-hooks/useGetData"

const ProductCard = () => {
  const {data:productsData, loading} = useGetData("products")

  const dispatch = useDispatch()
  const addToCart = (item) =>{
    dispatch(
        cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl
        })
    );
        toast.success("Product added successfully");
  }

  return (
    <Container>
        <Row>
        <Col lg='3' md='4' className='mb-2 d-flex'>
        {
            loading ? (
                <h4 className='py-5 text-align-center fw-bold'>Loading.............</h4>
            ) : (productsData?.map((item, index)=>(
                <>
                    <div className="product__item" key={item}>
                            <div className="product__img">
                                <motion.img whileHover={{scale: 0.9}} src={item.imgUrl}/>
                            </div>
                            <div className="p-2 product__info">
                                <h3 className="product__name" style={{width:"15rem"}}>
                                    <Link to={`/shop/${item.id}`}>{item.productName}</Link>
                                </h3>
                                <span>{item.category}</span>
                            </div>
                            <div className="product__card-bottom d-flex align-items-center justify-content-between p-2"
                                style={{width: "15rem"}}
                            >
                                <span className="price">{item.price}$</span> 
                                <motion.span whileTap={{scale: 1.2}} onClick={()=>addToCart(item)}>
                                    <i class="ri-add-line"></i>
                                </motion.span>
                            </div>
                    </div>
                </>
            )))
        }
        </Col>
        </Row>
    </Container>
        
    )
}

export default ProductCard