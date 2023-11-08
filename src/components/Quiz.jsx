import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function Quiz(props) {
    const location=useLocation();
    const navigate=useNavigate();
    const [quizQuestions,setquizQuestions]=useState([])
    const [count,setCount]=useState(0);
    const [score,setScore]=useState(0);
    async function  fetchData(){
        const url=`https://opentdb.com/api.php?amount=${location.state.questions}&category=${location.state.category}&difficulty=${location.state.difficulty}&type=multiple`
        const response=await fetch(url);
        const data=await response.json()
       if(response.status===200){
        console.log(data.results)
        setquizQuestions(data.results);
       }
        
    }
    function convertUnicode(text){
        if(text.includes("&#039;") || text.includes("&rsquo;")){
           text=text.replaceAll("&#039;",String.fromCharCode(39));
        }   
        if(text.includes("&quot;")){
        
            text=text.replaceAll("&quot;",String.fromCharCode(34))
        }
        if(text.includes("&amp;")){
            text=text.replaceAll("&amp;",String.fromCharCode(38))
        }
       return text;
    }
    function previousQuestion(){
        if(count!==0){
            setCount(previous=>previous-1)
        }
    }
    function nextQUestion(){
        if(count<quizQuestions.length-1)
            setCount((prev)=>prev+1);

    }
    function calculateScore(event){
          if(event.target.value===quizQuestions[count].correct_answer)
              setScore((prev)=>prev+1);
    }
    function displayScore(){
        alert(score);
        navigate("/")
    }
    console.log(score)
    useEffect(()=>{
            try{
                fetchData();
            }
            catch(err){
                console.log(err)}
        },[])

         {
           if(quizQuestions.length>0){
            return(
                
                 <div className='container'>
                  <div className='question-container'>
                   <div className='question' style={{fontSize:"larger",color:"white",margin:"5px",padding:"5px",textAlign:"center"}}>
                     <label style={{padding:"5px"}}>{count+1}.</label>
                    {convertUnicode(quizQuestions[count].question)}
                   </div>
                   <div className='options'>
                     <ul className='option-items' style={{listStyle:'none'}}>
                   
                    {
                      (quizQuestions[count].incorrect_answers).map((option,index)=>
                      <li style={{fontSize:"larger",color:"white",margin:"5px",padding:"5px"}} key={index}>
                      <input type="radio"  name="options" onChange={calculateScore} value={option}/>
                      {convertUnicode(option)}
                      </li>)
                    }
                    <li style={{fontSize:"larger",color:"white",margin:"5px",padding:"5px"}}>
                     <input type="radio" name="options" onChange={calculateScore} value={quizQuestions[count].correct_answer}/>
                     {convertUnicode(quizQuestions[count].correct_answer)}
                     </li> 
                    
                     </ul>
                   </div>
                </div>
                 <div className='buttons-container'>
                    <button onClick={previousQuestion}>previous</button>
                    <button onClick={displayScore}>submit</button>
                    <button onClick={nextQUestion}>next</button>
                 </div>
                </div>
            );
           }
         }
}

export default Quiz;