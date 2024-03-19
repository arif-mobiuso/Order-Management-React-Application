import React, { useState, useEffect } from 'react'
import Card from "../components/Card"
import { getAllProducts, getProductsByCategory, getCategories } from "../assets/API";
import "../styles/pages/products.css";
import { ThreeDots} from 'react-loader-spinner'
import { product3 } from '../assets/images';

const Products = () => {

    const [items, setItems] = useState([]);
    const [category, setcategory] = useState();
    const [catOptions, setCatOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        const data = await getCategories();
        const allCategories = ["All", ...data]
        setCatOptions(allCategories);
    }



    const fetchProducts = async () => {
        setIsLoading(true);
        let data;
        if (category === "All") {
            data = await getAllProducts();
        } else {
            data = await getProductsByCategory(category);
        }
        setItems(data);
        setIsLoading(false);
    }



    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        fetchCategories();
    }, [category]);



    return (
        <>

            {
                isLoading ?

                    <div className="d-flex justify-content-center align-items-center  min-vh-100 ">
                        <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#FAA300"
                            ariaLabel="revolving-dot-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                    :
                    <div className="container mt-5 px-lg-5 px-md-3 px-sm-2 " id='products-section'>

                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-7 col-7">

                                <select className="form-select  me-3 mb-5" onChange={(e) => setcategory(e.target.value)} name="category" id="category">
                                    <option value="">Select category</option>
                                    {
                                        catOptions.map((category, index) => {
                                            return (<option key={index} value={category}>{category}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-5 col-5">

                                <button className="btn btn-secondary ml-2" type="button" onClick={() => fetchProducts()}>
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {items.map((product, index) => {
                                return (
                                    <>
                                        <Card key={index}
                                            id={product.id}
                                            desc={product.description}
                                            price={product.price}
                                            img={product3}
                                            category={product.category}
                                            inCart={false}
                                        ></Card>
                                    </>
                                )
                            })
                            }
                        </div>
                    </div>
            }




        </>
    )
}

export default Products
