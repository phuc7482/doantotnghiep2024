import React, {useState} from 'react'
import {Container, Row, Col, Form, FormGroup} from "reactstrap"
import {toast} from "react-toastify"

import {db, storage} from "../firebase.config"
import {uploadBytesResumable, getDownloadURL, ref} from "firebase/storage"
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const [enterTitleMenu, setEnterTitleMenu] = useState("")
  const [enterImg, setImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addMenu = async(e)=>{
    e.preventDefault()
    setLoading(true)

    //Add menu to menu
    try{
      const docRef = await collection(db, "kindProduct")
      const storageRef = ref(storage, `kind_name/${enterTitleMenu}`)
      const uploadTask = uploadBytesResumable(storageRef, enterImg)

      uploadTask.on(()=>{
        toast.error("images not upload!")
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
          await addDoc(docRef, {
            nameKindProduct: enterTitleMenu,
            photoKindImg: downloadURL
          })
        })
      })

      setLoading(false)
      toast.success("Kind category successfully!");
      navigate("/dashboard/all-menu");
    }catch (err) {
      setLoading(false)
      toast.error('Kind category not successfully!')
    }
  }
  return (
    <section>
        <Container>
            <Row>
                <Col lg="12">
                    {
                        loading ? (
                            <h4 className='py-5'>Loading......</h4>
                        ) : (
                            <>
                                <h4 className="mb-5 align-items-center">Add product category</h4>
                                <Form onSubmit={addMenu}>
                                    <FormGroup className="form__group">
                                    <span>Name category</span>
                                    <input type="text" 
                                            placeholder='Name category' 
                                            value={enterTitleMenu}
                                            onChange={(e)=> setEnterTitleMenu(e.target.value)}
                                            required
                                    />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                      <span>Product Image</span>
                                      <input type="file" 
                                          onChange={e=> setImg(e.target.files[0])} required />
                                    </FormGroup>
                                    <button className="buy__btn" type="submit">
                                      Add product category
                                    </button>
                                </Form>
                            </>
                        )
                    }
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Menu