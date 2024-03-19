import React, { useEffect } from 'react'
import { cardIMG } from "../assets/images";
import "../styles/pages/payment.css"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { placeOrder } from '../assets/API';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cart/CartSlice';
import { toast , ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Payment = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userDetails} = useSelector((state) => state.user);

    const schema = yup
        .object({
            paymentMode: yup.string().required(),
        })
        .required()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), })

    const items = useSelector((state) => state.cart.items);

    const products = items.map((item) => ({
        productId: item.id,
        productQuantity: item.quantity
    }));

    const onSubmit = async (data) => {

        const orderInfo = { ...data, products };
        const response = await placeOrder(orderInfo, userDetails[0].customerId);
        if (response.orderStatus.orderId) {
            toast.success("Order Placed", {
                position: "top-center",
                autoClose: 250

            })  
        }
        dispatch(clearCart());
        navigate('/account/orders');
    }

    // useEffect(() => {
    //     console.log(userDetails[0].customerId);
    // } , [])


    return (
        <>

            <div className="container" id='payment-section'>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-success  text-center">Payment Details</h1>

                <div className="form" onSubmit={handleSubmit(onSubmit)}>
                    <form >
                        <label className="text-success d-block mb-2">Payment Mode</label>
                        <div className='d-flex justify-content-start gap-5 mb-4'>
                            <div class="form-check form-check-inline">
                                <input {...register("paymentMode")} class="form-check-input" type="radio" name="paymentMode" id="inlineRadio1" value="Debit card" />
                                <label class="form-check-label" for="inlineRadio1">Debit Card</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input {...register("paymentMode")} class="form-check-input" type="radio" name="paymentMode" id="inlineRadio1" value="credit card" />
                                <label class="form-check-label" for="inlineRadio1">credit Card</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input {...register("paymentMode")} class="form-check-input" type="radio" name="paymentMode" id="inlineRadio1" value="Net banking" />
                                <label class="form-check-label" for="inlineRadio1">Net Banking</label>
                            </div>
                        </div>
                        <p className='text-danger'>{errors.paymentMode?.message}</p>
                        <div className="mb-4 md-6">
                            <label className="text-success d-block mb-2">Card Number</label>
                            <input type="text" className="form-control rounded-md" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="row mb-4 md-6">
                            <div className="col">
                                <label className="text-success d-block mb-2">Expiration Date</label>
                                <input type="text" className="form-control rounded-md" placeholder="MM/YY" />
                            </div>
                            <div className="col">
                                <label className="text-success d-block mb-2">CVV</label>
                                <input type="text" className="form-control rounded-md" placeholder="123" />
                            </div>
                        </div>
                        <div className="mb-4 md-6">
                            <label className="text-success d-block mb-2">Name on Card</label>
                            <input type="text" className="form-control rounded-md" placeholder="John Doe" />
                        </div>
                        <div className="mb-4 md-6 text-center">
                            {
                                products.length === 0 ?
                                    <button className='btn btn-success btn-block rounded-lg w-100' disabled type='submit'>Pay</button>
                                    :
                                    <button className='btn btn-success btn-block rounded-lg w-100' type='submit'>Pay</button>
                            }
                        </div>
                        <img src={cardIMG} alt="" className='shadow-img' />
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Payment

