import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from '../components/UI/CommonSection';
import "../styles/checkout.css"
import { useSelector } from "react-redux";
import useAuth from "../custom-hooks/useAuth";
import { ref, uploadBytesResumable, getDownloadURL }  from "firebase/storage"
import {db, storage} from "../firebase.config"
import { collection, addDoc } from 'firebase/firestore'
import qr from '../assets/images/QR.PNG'
import {toast} from "react-toastify"

const Checkout = (item) => {
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  
  
  const [loading, setLoading] = useState(false)

  const cartItems = useSelector((state)=> state.cart.cartItems);
  const totalQty = useSelector((state)=> state.cart.totalQuantity)
  const totalAmount = useSelector((state)=> state.cart.totalAmount)

  const [nameProduct, setNameProduct] = useState('')
  // const [totalMoney, setTotalMoney] = useState("")

  const {currentUser} = useAuth()

  const checkout__order = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const docRef = await collection(db, "orders")
      const storageRef= ref(storage, `image_orders/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on((error)=> {
        toast.error(error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          //store user data in firestore database
          await addDoc(docRef,{
            address: address,
            phoneNumber: number,
            displayName: name,
            // total: totalMoney,
            email,
            nameProduct: nameProduct,
            photoURL: downloadURL,
          })
        });
      })
      setLoading(false)
      toast.success('Order successfully!')
    } catch(error){
      setLoading(false)
      toast.error("Something went wrong!")
    }
  }

  return (
    <Helmet title="Checkout">
      <CommonSection />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form" onSubmit={checkout__order} > 
                <FormGroup className="form__group">
                  <input type="text"
                          placeholder="Your Name" 
                          value={name}
                          onChange={(e)=> setName(e.target.value)}
                          required
                      />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" 
                          placeholder="Your email" 
                          value={email}
                          onChange={(e)=> setEmail(e.target.value)}
                          required
                        />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type={currentUser && currentUser.phoneNumber } 
                          placeholder="Your phone number"
                          value={number}
                          onChange={(e)=> setNumber(e.target.value)}
                          required
                     />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" 
                        placeholder="Street Address"
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                        required
                      />
                </FormGroup>
                {/* <FormGroup className='form__group'>
                  <input type="text"
                          placeholder='Total Money'
                          value={totalAmount}
                          onChange={(e)=> setTotalMoney(e.target.value)}
                          required
                   />
                </FormGroup> */}
                <FormGroup className='form__group'>
                        <input type="text"
                        placeholder='Order'
                        value={nameProduct}
                        onChange={(e)=> setNameProduct(e.target.value)}
                        required />
                </FormGroup>
                <FormGroup className='form__group'>
                  <h5 color='red'>When you finish transferring money, take a photo and post it here</h5>
                  <input type="file"
                              onChange={(e)=> setFile(e.target.files[0])} />
                </FormGroup>
                <button className="buy__btn" 
                        type="submit" 
                        style={{width: "50%", 
                                backgroundColor:"ActiveCaption", 
                                alignItems:"center",
                                marginLeft:"25%"
                                }}>
                    Place an order
                  </button>
              </Form>
                <Container style={{marginTop: "50px"}}>
                      <Row>
                              {
                                cartItems.length === 0 ? (
                                  <h2 className="fs-4 text-center">No item in the cart</h2>
                                ) : (
                                  <table className="table bordered">
                                    <tbody>
                                      {
                                        cartItems.map((item, index)=>(
                                          <tr key={item.id}>
                                            <td>
                                              <img src={item.imgUrl} alt='' />
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                          </tr>
                                        ))
                                      }
                                    </tbody>
                                  </table>
                                )
                              }
                    </Row>
                </Container>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>Total Quantity: <span>
                  {totalQty} items
                </span></h6>
                <h6>Subtotal: <span>
                  {totalAmount}
                  $
                </span></h6>
                <h6>
                  <span>
                    Shipping: <br />
                    Free shipping
                  </span>
                  <span>0$</span>
                </h6>
                <h4>Total Cost:
                  <span>
                    {totalAmount}$
                  </span>
                  </h4>
              </div>
              <br />
              <div className='img__pay_cash'>
                <h4 className='font__img'>You transfer money via this QR code </h4>
                <img src={qr} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
};

export default Checkout