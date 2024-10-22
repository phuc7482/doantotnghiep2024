import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='4' md="6" className="mb-4">
            <div className='logo'>
              <div>
                <h1 className="text-white">E-Mart</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              E-mart was built by a 4th year student, named Le Dinh Bao Phuc
            </p>
          </Col>

          <Col lg='3' md="3" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Top Categories</h4>
                <ListGroup>
                  <ListGroupItem className="ps-0 border-0">
                    <Link>Mobile Phones</Link>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0">
                    <Link to='#'>Modern Laptop</Link>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0">
                    <Link to='#'>Smart Watches</Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
          </Col>

          <Col lg='2' md="3" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Useful Links</h4>
                <ListGroup>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/shop">Shop</Link>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0">
                    <Link to='/cart'>Cart</Link>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0">
                    <Link to='/login'>Login</Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
          </Col>

          <Col lg="3" md="4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Contact</h4>
                <ListGroup className="footer__contact">
                  <ListGroupItem className="ps-0 border-0 d-flex vertical-align-baseline gap-2">
                    <span><i class="ri-map-pin-line"></i></span>
                    <p>46 Lê Thiện Trị, Đà Nẵng</p>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0 d-flex vertical-align-baseline gap-2">
                    <span><i class="ri-phone-fill"></i></span>
                    <p>+0836 246 595</p>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0 d-flex vertical-align-baseline gap-2">
                    <span><i class="ri-mail-line"></i></span>
                    <p>ldbphuc.19it3@vku.udn.vn</p>
                  </ListGroupItem>
                </ListGroup>
              </div>
          </Col>

          <Col lg='12'>
            <p className="footer__copyright">Copyright {year} developed by Lê Đình Bảo Phúc. From VietNam</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;