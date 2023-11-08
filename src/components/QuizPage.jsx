import React, { useEffect, useState} from 'react';
import { useNavigate,Link,useLocation} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import toastStyle from './Helpers/toastStyle';
function QuizPage() {
    const navigate=useNavigate();
    const location=useLocation();
   
    const [quizType,setQuizType]=useState({
        questions:" ",
        difficulty:"",
        category:" ",

    })
    const [categories,setCategories]=useState([]);
    useEffect(()=>{
        const _categories=async()=>{
            try{
            const url="https://opentdb.com/api_category.php"
        
                const response=await fetch(url);
                const data=await response.json()
                setCategories(data.trivia_categories)
            }
            catch(err){
                console.log(err)
            }
           
        }
        _categories()
    },[])
    function handleChange(event){
        setQuizType({...quizType,[event.target.name]:event.target.value})
     }
     function setId(){
        for(let i=0;i<categories.length;i++){
            if(categories[i].name===quizType.category){
                quizType.category=categories[i].id;
            }
        }
     }
    function handleSubmit(){
        setId();
        if(location.state?.currentUser){
            if(quizType.category==="" || quizType.difficulty==="" || quizType.questions===""){

            }
            navigate("/quiz",{state:{questions:quizType.questions,difficulty:quizType.difficulty.toLowerCase(),category:quizType.category}});
        
        }
        else{
            toastStyle("Kindly Login to attempt a Quiz")
        }
        console.log(quizType)
    }
    console.log(categories)
    console.log(quizType);
   
    return (
       
        <div className='selection-container' >
         <div className='header'>
           <div id={location.state?.currentUser?"current-user":""}>{location.state?.currentUser}</div>
            <nav className='navigation'>
                <ul className='navigation-items'>
                    <li><Link to="/signin">login</Link></li>
                    <li><Link to='/createQuiz'>createQuiz</Link></li>
                </ul>
            </nav>
         </div>
        
         <div className='set-quiz'>
        <div className="questions">
         <div>Number of Questions</div>
        <input type="text" name="questions" onChange={handleChange}/>
        </div>
           
            <div className='difficulty'>
            <div>Select Difficulty</div>
             <select name="difficulty" onChange={handleChange}>

                <option>Easy</option>
                <option>Medium</option>
                <option>Difficulty</option>
             </select>
            </div>
            <div className='category'>
            <div>Select Category</div>
             <select name="category" onChange={handleChange}>
                {categories.map((category)=><option id={category.id} key={category.id}>{category.name}</option>)}
             </select>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            
            <ToastContainer/>
        </div>
    );
}

export default QuizPage;