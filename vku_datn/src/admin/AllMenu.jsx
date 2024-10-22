import React from 'react'
import {Container, Row, Col} from "reactstrap"
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import {toast} from "react-toastify"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import "../styles/all-menu.css"

const AllMenu = () => {
    const {data:menuList, loading} = useGetData("kindProduct")

  const deleteMenu = async(id)=>{
    await deleteDoc(doc(db, "kindProduct", id))
    toast.success("Delete kind category successfully!")
  }

  return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <table className='table'>
                        <thead>
                            <tr className='table__th'>
                                <th>Image Category</th>
                                <th>Name Category</th>
                                <th>Delete</th>
                                <th>
                                    <Link to={"/dashboard/menu"}>
                                        <motion.i whileTap={{scale: 1.2}} 
                                        class="ri-add-circle-line"></motion.i>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? (
                                    <h4 className='py-5 text-align-center fw-bold'>Loading.............</h4>
                                ) : (
                                    menuList.map((item)=>(
                                        <tr key={item.id} className='table__tr'>
                                            <td>
                                                <img src={item.photoKindImg} alt="" />
                                            </td>
                                            <td>{item.nameKindProduct}</td>
                                            <td>
                                                    <i class="ri-delete-bin-2-line"
                                                        onClick={() => {
                                                            deleteMenu(item.id)
                                                        }}
                                                        style={{color: "red"}}>
                                                    </i>
                                            </td>

                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default AllMenu