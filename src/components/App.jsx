import React from "react";
import SignIn from "./SignIn";
import QuizPage from "./QuizPage";
import {Routes,Route} from "react-router-dom";
import Quiz from "./Quiz";
import CreateQuiz from "./CreateQuiz"
function App()
{
    
    return (
       
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/"      element={<QuizPage/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/createquiz" element={<CreateQuiz/>}/>
        </Routes>

    );
}

export default App;