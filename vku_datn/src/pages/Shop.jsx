import React, {useState} from "react"

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet"
import { Container, Row, Col } from "reactstrap";
import '../styles/shop.css'
import ProductCard from "../components/UI/ProductCard";
import ProductsList from "../components/UI/ProductsList"
import useGetData from "../custom-hooks/useGetData";

const Shop = () => {
    const {data:productsData} = useGetData("products")
    const [products, setProductsData] = useState(productsData)

    const handleFilter = (e)=>{
        const filterValue = e.target.value

        if(filterValue==='mobile'){
            const filteredProducts = productsData.filter(
                (item)=> item.category === 'mobile'
            )

            setProductsData(filteredProducts)
        }

        if(filterValue==='headphone'){
            const filteredProducts = productsData.filter(
                (item)=> item.category === 'headphone'
            )

            setProductsData(filteredProducts)
        }

        if(filterValue==='laptop'){
            const filteredProducts = productsData.filter(
                (item)=> item.category === 'laptop'
            )

            setProductsData(filteredProducts)
        }
    }

    const handleSearch = (e)=>{
        const searchTerm = e.target.value
        const searchedProducts = productsData.filter(
            (item)=> item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

        setProductsData(searchedProducts)
    }

    return (
        <Helmet title='Shop'>
            <CommonSection title="Products"/>

            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option>Filter by Category</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="headphone">Headphone</option>
                                    <option value="laptop">Laptop</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="9" md="12">
                            <div className="search__box">
                                <input type="text" placeholder="Search....." onChange={handleSearch} />
                                <span><i class="ri-search-line"></i></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg='12' md='4' >
                        {
                            products.length === 0 ?
                            (<h1 className="text-center fs-4">
                                No products are found
                            </h1>) : (
                                <ProductCard data={products} />
                            )
                        }
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
};

export default Shop;