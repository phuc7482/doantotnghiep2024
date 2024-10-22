import React from 'react'
import {Container, Row, Col} from "reactstrap"
import { db, storage } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import {toast} from "react-toastify"
import { Link } from 'react-router-dom'
import "../styles/all-menu.css"

const AllProducts = () => {
  const {data:productsData, loading} = useGetData("products")
  const deleteProduct = async(id)=>{
    await deleteDoc(doc(db, "products", id))
    toast.success("Deleted successfully!")
  }

  // const [posts, setPosts] = useState([])
  // const [loading, setLoading] = useState(true)
  // useEffect(()=>{
  //   const getPostsFromFirebase = []
  //   const subscriber = db
  //     .collection("products")
  //     .onSnapshot((querySnapshot)=>{
  //       querySnapshot.forEach((doc) => {
  //         getPostsFromFirebase.push({
  //           ...doc.data(),
  //           key: key.id,
  //         })
  //         setPosts(getPostsFromFirebase);
  //         setLoading(false)
  //       });
  //     })
  //     return ()=>subscriber();
  // },[])

  // const handleSearch = (e)=>{
  //   const searchTerm = e.target.value
  //   const searchedProducts = products.filter(
  //       (item)=> item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

  //   setProductsData(searchedProducts)
  // }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className='fw-bold' style={{justifyContent:"center"}}>All Product</h4>
          </Col>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr className='table__th'>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  {/* <th>
                    Design product
                  </th> */}
                  <th>
                    Action
                  </th>
                  <th>
                    <Link to={"/dashboard/add-products"}>
                      <i class="ri-add-circle-line"></i>
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
                    <h4 className='py-5 text-align-center fw-bold'>
                      Loading.....
                    </h4>
                  ) : (productsData.map((item)=>(
                      <tr key={item} className='table__tr'>
                        <td>
                          <img src={item.imgUrl} alt="" />
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.category}</td>
                        <td>{item.price}$</td>
                        {/* <td>
                            <i class="ri-edit-line"></i>
                        </td> */}
                        <td>
                          <i onClick={()=> {deleteProduct(item.id)}} 
                              class='ri-delete-bin-line'
                            ></i>
                        </td>
                      </tr>
                    )))
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts