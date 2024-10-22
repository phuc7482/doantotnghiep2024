import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slide.css"


const img1= "https://cdn.tgdd.vn/Files/2022/07/07/1445532/laptop-like-new-99-la-gi-co-tot-khong-co-nen-1.jpg"
const img2= "https://cdn.tgdd.vn//News/0//laptop-la-gi-760x427.jpg"
const img3= "https://product.hstatic.net/200000722513/product/ch-g733-lightspeed-wireless-black-666_2eb1a71d562e4a6d853a0f086723cbe3_f7f15fa3c25c4d6190c05c6db168fbf7.png"
const img4 = "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/dien-thoai-sam-sung-moi-nhat-4.png"


const Slide = () => {
    const settings = {
        dots:true,
        infinite: true,
        speed: 800,
        slideToShow: 1,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

  return (
    <Slider {...settings}>
        <div className="slide">
             <img src={img1} alt="" />
        </div>
        <div className="slide">
            <img src={img2} alt="" />
        </div>
        <div className="slide">
            <img src={img3} alt="" />
        </div>
        <div className="slide">
            <img src={img4} alt="" />
        </div>
    </Slider>
  )
}

export default Slide