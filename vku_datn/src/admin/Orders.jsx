import React, {useState} from 'react'
import {Container, Row, Col} from "reactstrap"
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import {toast} from "react-toastify"
import '../styles/orders.css'

const Orders = () => {
  // const[enterTitle, setEnterTitle] = useState("")
  // const[enterShortDesc, setEnterShortDesc] = useState("")
  // const[enterDescription, setEnterDescription] = useState("")
  // const[enterCategory, setEnterCategory] = useState("")
  // const[enterPrice, setEnterPrice] = useState("")
  // const[enterProductImg, setEnterProductImg] = useState(null)
  const[loading] = useState(false)

  const deleteOrder = async(id)=>{
    await deleteDoc(doc(db, "orders", id))
    toast.success("Deleted successfully!")
  }

  const {data:ordersData} = useGetData("orders")
  
  return (
    <section>
      <h4 className='fw-bold align-text-center' style={{justifyContent:"center"}}>All Orders</h4>
      <Container>
        <Row>
            {
              loading?(
                <h4 className='py-5 text-align-center fw-bold'>
                      Loading.....
                </h4>
              ):(ordersData.map((item)=>(
                <Col lg='6' style={{justifyContent:"center"}}>
                  <div item={item} className='border__orders'>
                    <div style={{alignItems: "center", textAlign: "center", display:"flex", justifyContent:"center"}}>
                        <i style={{color: "blue"}}
                          class="ri-skip-up-line"></i>|
                        <i onClick={()=> {deleteOrder(item.id)}} 
                            class='ri-delete-bin-line'
                            style={{color: "red"}}
                        ></i>
                    </div>
                    <hr />

                    <div className="info__order d-flex align-items-center justify-content-between">
                          <span>Name Customer: {item.displayName}</span>
                      </div>
                      <hr />

                      <div className="info__order d-flex align-items-center justify-content-between">
                          <span>Name Product: {item.nameProduct}</span>
                      </div>
                      <hr />
                      <div className="info__order d-flex align-items-center justify-content-between">
                          <span>Email: {item.email}</span>
                          <span>Phone Number: {item.phoneNumber}</span>
                      </div>
                      <hr />
                      <div className="info__order d-flex align-items-center justify-content-between">
                          <span>Address: {item.address}</span>
                      </div>
                      <hr />
                      <div className="info__order d-flex align-items-center justify-content-between">
                          <img src={item.photoURL} style={{height:"25rem"}} alt="" />
                      </div>
                  </div>
                  </Col>
                ))
              )
            }
            
        </Row>
      </Container>
    </section>
  )
}

export default Orders