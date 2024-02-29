import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ToastContainer, toast } from "react-toastify";
import { getCustomerDetails, login } from "../../assets/API/index";
import { useDispatch } from 'react-redux';
import { addUserDetails, loginSuccess } from '../../features/user/userSlice';
import { IoIosEyeOff, FaFacebook, FaGoogle, FaTwitter, FaGithub, FaRegEye } from "../../assets/icons/index";


// style sheet 

import "../../styles/components/login.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);



    const schema = yup
        .object({
            email: yup.string().email().required(),
            // password: yup.string().required('Password is required').matches(
            //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            //     'Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.'
            // ),
        })
        .required()
    const { register, handleSubmit, formState: { errors }, } =
        useForm({ resolver: yupResolver(schema), })




    const onSubmit = async (data) => {
        const response = await login(data);
        console.log(response);
        if (response.statusCode === 200) {
                toast.success("Login Successful", {
                    position: "top-center",
                    autoClose: 250
    
                })    
            
            dispatch(loginSuccess({ data: response }));
            const result = await getCustomerDetails(response.customerId);
            dispatch(addUserDetails({user : result.result}))
            navigate("/");
        }
        else if (response.statusCode === 401) {
            toast.error("Invalid Credentials", {
                position: "top-center",
                autoClose: 1000
            })
            console.log(response);
        }
    }





    return (
        <div className='container d-flex justify-content-center align-items-center px-5 ' id='login-section'>
            <div className="tab-content w-75">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-3">
                            <p>Sign in with</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaFacebook />
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaGoogle />
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaTwitter />
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaGithub />
                            </button>
                        </div>

                        <p className="text-center">or</p>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <input {...register("email")} type="email" id="loginName" className="form-control" />
                            <p>{errors.email?.message}</p>
                            <label className="form-label" for="loginName">Email or username</label>
                        </div>

                        {/* <!-- Password input --> */}

                        <div class="input-group mb-3">
                            <input {...register("password")} type={show ? "text" : "password"} id="loginPassword" className="form-control" />
                            <button onClick={() => setShow(!show)} class="btn btn-none" type="button" id="button-addon2">
                                {
                                    show ? <IoIosEyeOff /> : <FaRegEye />
                                }
                            </button>
                        </div>
                        <label className="form-label" htmlFor="loginPassword">Password</label>

                        {/* <!-- 2 column grid layout --> */}
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                    <label className="form-check-label" for="loginCheck"> Remember me </label>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-center">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className=" d btn btn-primary btn-block mb-4">Sign in</button>
                        </div>

                        <div className="text-center">
                            <p>Not a member? <a className='text-light' onClick={() => navigate("/register")}>Register</a></p>
                        </div>
                    </form>
                </div>


            </div>

            <ToastContainer />
        </div>
    )
}

export default Login
