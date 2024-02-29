import React, {  useState } from 'react'
import { FaFacebook, FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";

import { City, State, Country } from "country-state-city";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { registerUser } from "../../assets/API/index.js";
import { Link, useNavigate } from 'react-router-dom';




const Register = () => {

    const [countryCode, setCountryCode] = useState();
    const [stateCode, setStateCode] = useState();
    const countries = Country.getAllCountries();
    const navigate = useNavigate();

    const schema = yup
        .object({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            number: yup.string().required().matches(/^\d{10}$/, "Number must be exactly 10 digits"),
            gender: yup.string().required(),
            country: yup.string().required(),
            pincode: yup.string().required().matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
            state: yup.string().required(),
            city: yup.string().required(),
            email: yup.string().email().required(),
            username: yup.string().required(),
            password: yup.string().required('Password is required').matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                'Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.'
            ),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            addressLine1: yup.string().required(),
            addressLine2: yup.string().required(),

        })
        .required()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), })

    const onSubmit = async (data) => {
        const res = await registerUser(data);

        if (res.customerId) {
            navigate('/products');
        }
    };




    return (

        <div className='container d-flex justify-content-center mt-4 ' >
            <div className="tab-content w-75">
                <div className="tab-content " id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-3">
                            <p>Sign up with:</p>
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

                        <p className="text-center fs-3">Contact Information</p>

                        {/* fname */}

                        <div className="row">
                            <div className="form-outline col mb-4">
                                <input  {...register("firstName")} type="text" id="registerFirstName" className="form-control" />
                                <p className='text-danger'>{errors.firstName?.message}</p>
                                <label className="form-label ms-2" for="registerFirstName">First Name</label>
                            </div>

                            {/* lname */}
                            <div className="form-outline col mb-4">
                                <input {...register("lastName")} type="text" id="registerLastName" className="form-control" />
                                <p className='text-danger'>{errors.lastName?.message}</p>
                                <label className="form-label ms-2" for="registerLastName">Last Name</label>

                            </div>
                        </div>
                        <div className="row">
                            {/* gender */}
                            <div className="col">
                                <div class="form-check form-check-inline">
                                    <input {...register("gender")} class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="M" />
                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input {...register("gender")} class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="F" />
                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                    <p className='text-danger'>{errors.gender?.message}</p>

                                </div>
                            </div>
                            {/* number */}
                            <div class="form-outline col">
                                <input {...register("number")} type="tel" id="typePhone" class="form-control" />
                                <p className='text-danger'>{errors.number?.message}</p>
                                <label class="form-label ms-2" for="typePhone">Phone number </label>
                            </div>
                        </div>
                        <div className="row">



                            <div className="col">
                                <select  {...register("country")} onChange={(e) => setCountryCode(e.target.options[e.target.selectedIndex].getAttribute('data-key'))} id='registerCountry' class="form-select " >
                                    <option value="default">Select Country</option>
                                    {
                                        countries.map((country) => {
                                            return (
                                                <option data-key={country.isoCode} value={country.name}>{country.name}</option>
                                            );
                                        })
                                    }
                                </select>
                                <p className='text-danger'>{errors.country?.message}</p>
                                <label className='ms-2 form-label' htmlFor="registerCountry">Country</label>
                            </div>



                            <div className="col">
                                <select  {...register("state")} class="form-select" id='registerState' onChange={(e) => setStateCode(e.target.options[e.target.selectedIndex].getAttribute('data-key'))}>
                                    <option value="default">Select State</option>

                                    {
                                        State.getStatesOfCountry(countryCode).map((state) => {
                                            return (
                                                <option data-key={state.isoCode} value={state.name}>{state.name}</option>
                                            );
                                        })
                                    }
                                </select>
                                <p className='text-danger'>{errors.state?.message}</p>
                                <label className='ms-2 form-label' htmlFor="registerState">State</label>

                            </div>


                        </div>


                        <div className="row mt-4">

                            {/* <!-- state --> */}

                            <div className="col">
                                <select {...register("city")} class="form-select" id='registerCity'>
                                    <option value="default">Select City</option>
                                    {
                                        City.getCitiesOfState(countryCode, stateCode).map((city) => {
                                            return (

                                                <option value={city.name}>{city.name}</option>
                                            );

                                        })
                                    }


                                </select>
                                <p className='text-danger'>{errors.city?.message}</p>
                                <label className='ms-2 form-label' htmlFor="registerCity">City</label>

                            </div>

                            {/* <!--  pincode --> */}
                            <div className="form-outline col mb-4">
                                <input {...register("pincode")} type="number" id="registerPincode" className="form-control" />
                                <p className='text-danger'>{errors.pincode?.message}</p>
                                <label className="form-label ms-2" for="registerPincode">pincode</label>
                            </div>

                        </div>
                        <div className="row">
                            {/* <!-- Address line 1--> */}
                            <div className="form-outline col mb-4">
                                <input {...register("addressLine1")} type="text" id="registerAddress1" className="form-control" />
                                <p className='text-danger'>{errors.addressLine1?.message}</p>
                                <label className="form-label ms-2" for="registerAddress1">Address Line 1</label>
                            </div>
                            {/* Address line 1 */}
                            <div className="form-outline col mb-4">
                                <input {...register("addressLine2")} type="text" id="registerAddress2" className="form-control" />
                                <p className='text-danger'>{errors.addressLine2?.message}</p>
                                <label className="form-label ms-2" for="registerAddress2">Address Line 2</label>
                            </div>
                        </div>


                        <p className="text-center fs-3">Credential Information</p>

                        <div className="row">
                            <div className="col-lg">
                                <div className="form-outline col mb-4">
                                    <input {...register("email")} type="email" id="registerEmail" className="form-control" />
                                    <p className='text-danger'>{errors.email?.message}</p>
                                    <label className="form-label ms-2" for="registerEmail"> Email</label>
                                </div>
                                <div className="form-outline col mb-4">
                                    <input {...register("username")} type="text" id="registerUsername" className="form-control" />
                                    <p className='text-danger'>{errors.username?.message}</p>

                                    <label className="form-label ms-2" for="registerUsername">Username</label>
                                </div>
                                <div className="form-outline col mb-4">
                                    <input {...register("password")} type="password" id="registerPassword" className="form-control" />
                                    <p className='text-danger'>{errors.password?.message}</p>
                                    <label className="form-label ms-2" for="registerPassword">Password</label>
                                </div>
                                <div className="form-outline col mb-4">
                                    <input {...register("confirmPassword")} type="password" id="registerRepeatPassword" className="form-control" />
                                    <p className='text-danger'>{errors.confirmPassword?.message}</p>
                                    <label className="form-label ms-2" for="registerRepeatPassword">Confirm Password</label>
                                </div>

                            </div>
                        </div>


                        {/* <!-- Checkbox --> */}
                        <div className="form-check d-flex justify-content-center mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                                aria-describedby="registerCheckHelpText" />
                            <label className="form-check-label" for="registerCheck">
                                I have read and agree to the terms
                            </label>
                        </div>


                        {/* <!-- Submit button --> */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-3 center">Register</button>
                        </div>
                    </form>
                </div>
                <div className="text-center">
                <p>Already  a member? <Link className='link' onClick={() => navigate("/login")}>Login</Link></p>
            </div>
            </div>
            
        </div>

    )
}

export default Register
