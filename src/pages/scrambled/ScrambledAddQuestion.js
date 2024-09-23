import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import useHttp from "../../hooks/useHttp";
import { useState } from "react";
import AuthHeader from "../../components/AuthHeader";
export default function ScrambledAddQuestion(){

    const {post,error,loading,loadingMessage} = useHttp('game/trivia/create',{loadMessage:'Create',loadedMessage:'Creating.....'});  
    const {category_id,category_name} = useParams();
    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");
    const [hint, setHint] = useState("");
    const [message, setMessage] = useState("");

    const handleQuestionCreation = async(e) => {
        e.preventDefault();
        if( question === "" ) setMessage("Question cannot be empty. ");
        else if( answer === "" ) setMessage("Answer cannot be empty. ");
        else if( hint === "" ) setMessage("Hint cannot be empty. ");
        else{
          const data = await post({category_id,question,answer,hint});
          if( !data ) return;

          setMessage(`Question has been created successfully. `);
        }
    }

    return (
        <div className="App">
        
        <AuthHeader />

    <section class="hero">
        <div class="container">
            <p>Welcome to Scrambled Words Setup. Here you can manage categories and questions regarding scrambled words</p>
            <h3>{category_name} - Create Scrambled Question</h3>
            <div>

            <div className="input-group">
                <label htmlFor="question">Question</label>
                <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}   />
            </div>
            <div className="input-group">
                <label htmlFor="answer">Answer</label>
                <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
            </div>
            
            <div className="input-group">
                <label htmlFor="hint">Hint?</label>
                <input type="text" value={hint} onChange={(e)=>setHint(e.target.value)} />
            </div>

            <div className="input-group">
                <Button name={loadingMessage} disabled={loading} onClick={handleQuestionCreation}  />
            </div>

            </div>

            <p>{ error ? error:message}</p>


        </div>
    </section>

    
      </div>
    )

}