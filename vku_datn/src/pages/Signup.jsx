import React, {useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL }  from "firebase/storage"
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';

import {auth} from '../firebase.config'
import {storage} from '../firebase.config'
import { db } from '../firebase.config';

import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Signup = () => {
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const signup = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, `images/${username}`)
      const user = await userCredential.user;
      const uploadTask = uploadBytesResumable(storageRef, file)
      const docRef = await collection(db, "users")


      uploadTask.on((error)=> {
        toast.error(error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          //update user profile
          await updateProfile(user, {
            Address: address,
            phoneNumber: number,
            Email: email,
            displayName: username,
            photoUrl: downloadURL
          });

          //store user data in firestore database
          await setDoc(doc(db, "users", user.uid),{
            uid: user.uid,
            address: address,
            phoneNumber: number,
            displayName: username,
            email,
            photoUrl: downloadURL
          })

          await addDoc(docRef, {
            address: address,
            phoneNumber: number,
            displayName: username,
            email,
            photoUrl: downloadURL
          })
        });
      })

      setLoading(false)
      toast.success('Account created')
      navigate('/checkout')
    } catch(error){
      setLoading(false, )
      toast.error("Something went wrong")
    }
  }

  return (
    <Helmet title="Signup">
        <section className='signup_background'>
          <Container>
            <Row>
              {
                loading? (<Col lg="12" className="text-center">
                  <h5 className='fw-bold'>Loading......</h5>
                  </Col>
                  ):(
                  <Col lg="6" className="m-auto text-center">
                    <h3 className="fw-bold mb-4">REGISTER YOUR ACCOUNT</h3>
    
                    <Form className="auth__form" onSubmit={signup}>
                      <FormGroup className="form__group">
                        <input type="text" 
                              placeholder="Enter your Username" 
                              value={username} 
                              onChange={(e)=> setUsername(e.target.value)} />
                      </FormGroup>
    
                      <FormGroup className="form__group">
                        <input type="text" 
                              placeholder="Enter your Address" 
                              value={address} 
                              onChange={(e)=> setAddress(e.target.value)} />
                      </FormGroup>

                      <FormGroup className="form__group">
                        <input type="email" 
                              placeholder="Enter your Email" 
                              value={email} 
                              onChange={(e)=> setEmail(e.target.value)} />
                      </FormGroup>

                      <FormGroup className="form__group">
                        <input type="number" 
                              placeholder="Enter your Phone number" 
                              value={number} 
                              onChange={(e)=> setNumber(e.target.value)} />
                      </FormGroup>
    
                      <FormGroup className="form__group">
                        <input type="password" 
                              placeholder="Enter your Password"
                              value={password}
                              onChange={(e)=> setPassword(e.target.value)} />
                      </FormGroup>
                      <FormGroup className="form__group">
                        <input type="file"
                              onChange={(e)=> setFile(e.target.files[0])} />
                      </FormGroup>
    
                      <button type="submit" className="buy__btn auth__btn">
                        Create an Account
                      </button>
                      <p>Already have an account?{" "}
                        <Link to="/login">Login</Link>
                      </p>
                    </Form>
                  </Col>
                  )
              }
            </Row>
          </Container>
        </section>
    </Helmet>
  )
};

export default Signup;