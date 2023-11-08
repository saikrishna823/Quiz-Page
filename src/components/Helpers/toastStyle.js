
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function toastStyle(msg) {
    toast(msg,{
        position:'bottom-right',
        autoClose:5000,
        progress:undefined,
        closeOnClick:true,
        theme:"light",
        hideProgressBar:false,
        pauseOnHover:false,
        type:"error",

    })
}

export default toastStyle;