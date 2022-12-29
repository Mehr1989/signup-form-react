import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { chooseEmail,choosePassword  } from "../redux/rootSlice";


const Step2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  const email = useSelector(state => state.email)
  const password = useSelector(state => state.password)

  const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: { email, password} });

  const onSubmit = (data) => {
    dispatch(chooseEmail(data.email))
    dispatch(choosePassword(data.password))
    navigate("./step3")
  }

  return (
    <>

    <label className="label">
      {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
      {errors.email?.type === 'pattern' && <span >{errors.email.message}</span>}
    </label>

    <label className="label">
      {errors.password?.type === 'required' && <span >{errors.password.message}</span>}
      {errors.password?.type === 'minLength' && <span >{errors.password.message}</span>}
    </label>


     <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>
                                <span>Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                            
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: <h4>Email is Required</h4>
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: <h4>Provide a valid Email</h4>
                                    }
                                })}
                            />
                        </div>

                          <span>Password:
       
                 <input  type={passwordShown ? "text" : "password"} placeholder={"password..."}
     
                  {...register("password",{
                  required:  {

                   value:true,
                   message: <h4>Password is required</h4>
                   },
                   minLength: {
                    value: 6,
                    message: <h4>Must be 6 characters or longer</h4>
                }
       
                   })}
                   />
                   </span>

                   
               <input 
                 type="checkbox"
                 id="checkbox"
                 checked={passwordShown}
                 onChange={togglePassword}
              />
              <label htmlFor="checkbox">Show password </label>
                        
                                
                          



                        
                        <div>
                        <button onClick={() =>navigate("/")}>Back</button>
                        <input  type="submit" value="Next" />
                        </div>
                        
                       
                        
                    </form>
      
    </>
  )
}
export default Step2;