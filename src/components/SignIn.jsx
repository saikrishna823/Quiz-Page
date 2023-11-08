import React from 'react';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles.css"
import {ToastContainer} from "react-toastify";
import toastStyle from './Helpers/toastStyle';
import "react-toastify/dist/ReactToastify.css"


function SignIn() {
    const navigate = useNavigate();
    const [signIn, setsignInDetails] = React.useState(
        {
            name:"",
            email:""
        }
    );
    const [signedIn,setSignedInUsers]=React.useState([]);
   
    function handleChange(event) {
        const { name, value } = event.target;
        setsignInDetails((prevDetails) => {
            return ({
                ...prevDetails,
                [name]: value
            });
        })
    }

    function handleSubmit(event) {
        if((signIn.email!=="" && signIn.name!==""))
        {  
             if((signedIn.some(e=>e.name===signIn.name))|| (signedIn.some(e=>e.email===signIn.email))){
               toastStyle("Email or userName already Exist !!!")
            }
            else{
                Axios.post("http://localhost:5000/logIn", { details: signIn })
                .then(() => {
                    alert("data Sent");
                })
                .catch(() => {  
                    alert("error");
                });
                setsignInDetails({
                    name:"",
                    email:""
                })
               navigate("/",{state:{currentUser:signIn.name}});
            }
           
        }
        else{
           toastStyle("Kindly Enter Details !!!")
            
        }
    }


    React.useEffect(() => {
        Axios.get("http://localhost:5000/getDetails")
            .then((response) => {
                setSignedInUsers(response.data)
            })
            .catch((error) => {
                alert("Error Occured");
            }
            )
    }, [])
 
    return (
       
        <div className="sign-in">
          <div className='sign-container'>
           <input type="text" name="name" onChange={handleChange} value={signIn.name} placeholder="Enter Name" />
            <input type="email" name="email" onChange={handleChange} value={signIn.email} placeholder="Enter Email" />
            <button type="submit" onClick={handleSubmit}>Enter</button>
            </div>
            <ToastContainer/>
        </div>
            
    );
}
export default SignIn;