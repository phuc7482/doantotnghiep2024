import React,{useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-details.css'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from "react-toastify"

import useGetData from '../custom-hooks/useGetData'
import ProductCard from '../components/UI/ProductCard'

const ProductDetails = () => {
  const {data:productsData} = useGetData("products")

  // const [product, setProduct] = useState({productsData})
  // const [tab, setTab] = useState("desc")
  // const reviewUser = useRef("")
  // const reviewMsg = useRef('')
  // const [rating, setRating] = useState(null)

  // const docRef = doc(db, 'products')

  // useEffect(()=>{
  //   const getProduct = async ()=>{
  //     const docSnap = await getDoc(product)

  //     if(docSnap.exists()){
  //       setProduct(docSnap.data())
  //     }else{
  //       console.log("Don't products!")
  //     }
  //   }

  //   getProduct()
  // },[])

  // const {imgUrl, productName, price, description, shortDesc, category} = productsData
  // const relatedProducts = productsData.filter((item) => item.category === categories)
  // const submitHandler = (e)=>{
  //   e.preventDefault()

  //   const reviewUserName= reviewUser.current.value;
  //   const reviewUserMsg = reviewMsg.current.value;

  //   const reviewObj = {
  //     userName: reviewUserName,
  //     text: reviewUserMsg,
  //     rating: rating,
  //   };

  //   console.log(reviewObj);
  //   toast.success("Review Submitted");
  // }

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

  useEffect(()=> {
    window.scrollTo(0,0)
  },[productsData])

  // const relatedProducts = ()=>{
  //   if(productsData.filter((item)=> item.category) === category){
  //     productsData.Array.prototype.map((item, index)=>{
  //       <ProductCard item={item} key={index} />
  //     })
  //   }
  // }

  return (
    <Helmet>
        {productsData.map((item, index)=>(
              <>
              <CommonSection title={item.productName} />
              <section className="pt-0 mt-3" key={index.id} item={item.id}>
                <Container>
                  <Row>
                    <Col lg='6'>
                      <img src={item.imgUrl} style={{width: "80%", height:"25rem", alignItems:"center"}} alt="" />
                    </Col>

                    <Col lg='6'>
                      <div className="product__details">
                        <h2>{item.productName}</h2>
                        <div className="product__rating d-flex align-items-center gap-5 mb-3">
                          <div>
                            <span><i class="ri-star-s-fill"></i></span>
                            <span><i class="ri-star-s-fill"></i></span>
                            <span><i class="ri-star-s-fill"></i></span>
                            <span><i class="ri-star-s-fill"></i></span>
                            <span><i class="ri-star-half-s-line"></i></span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-5">
                          <span className="product__price">${item.price}</span>
                          <span>Category: {item.category.toUpperCase()}</span>
                        </div>
                        <p className="mt-3">{item.shortDesc}</p>
                        <p className='mt-3'>{item.description}</p>
        
                            <motion.button whileTap={{scale: 1.2}} 
                                            className="buy__btn" 
                                            width={'50%'} 
                                            onClick={()=>addToCart(item)}>
                              Add to Cart
                            </motion.button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className='mt-4'>
                  <h3 style={{justifyContent:"center", textAlign:"center"}}>New product</h3>
                  <Container>
                    <ProductCard  />

                  </Container>
              </section>
              </>
            )
        )}
    </Helmet>
  );
}
export default ProductDetails;