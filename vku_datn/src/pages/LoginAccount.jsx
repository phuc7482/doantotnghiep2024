import React, {useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import {useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import {toast} from 'react-toastify'
import '../styles/login.css'


const LoginAccount = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signIn = async(e)=> {
        e.preventDefault()
        setLoading(true)
        try {
          const userCredential = await signInWithEmailAndPassword(auth, username, password)

          const user = userCredential.user
            console.log(user)
            setLoading(false)
            toast.success("Success fully logged in")
            navigate('/dashboard')
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
      }

  return (
    <Helmet title="Login-Admin">
        <section>
          <Container>
            <Row>
              {
                loading ? (
                  <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading......</h5></Col>
                ): (
                  <Col lg="6" className="m-auto text-center">
                    <h3 className="fw-bold mb-4">Login Admin</h3>

                    <Form className="auth__form" onSubmit={signIn}>
                      <FormGroup className="form__group">
                        <input type="text" 
                              placeholder="Enter your Username" 
                              value={username} 
                              onChange={(e)=> setUsername(e.target.value)} />
                      </FormGroup>
                      <FormGroup className="form__group">
                        <input type="password" 
                              placeholder="Enter your Password"
                              value={password}
                              onChange={(e)=> setPassword(e.target.value)} />
                      </FormGroup>

                      <button type="submit" className="buy__btn auth__btn">
                        Login
                      </button>
                    </Form>
                  </Col>
                )
              }
            </Row>
          </Container>
        </section>
    </Helmet>
  )
}

export default LoginAccount