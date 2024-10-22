import React from 'react'
import { Container } from 'reactstrap'
import "../../styles/common-section.css"
// import Clock from 'react-live-clock';

const CommonSection = ({title}) => {
  return (
    <section className="common__section">
      <Container className="text-center">
        <h1>{title}</h1>
        {/* <h1>
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'VIETNAM'} />
        </h1> */}
      </Container>
    </section>
  )
}

export default CommonSection