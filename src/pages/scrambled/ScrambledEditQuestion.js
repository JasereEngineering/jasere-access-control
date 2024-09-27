import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import useHttp from "../../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";
import AuthHeader from "../../components/AuthHeader";
export default function ScrambledEditQuestion(){

    // const navigate = useNavigate(); 
    const {question_id} = useParams();
    const [loading,setLoading] = useState(true);
    const { get } = useHttp(`game/question/${question_id}`,{loadMessage:'',loadedMessage:''});
    const { get:getLevels } = useHttp(`game/difficulty/levels`,{loadMessage:'',loadedMessage:''});
    const {put,error,loadingMessage} = useHttp(`game/question/update/${question_id}`,{loadMessage:'Save',loadedMessage:'Saving Changes.....'});
    const [trivia,setTrivia] = useState({
        question:"",
        hint:"",
        answer:"",
        difficulty_level:0
    });
    const [answer_edit,setAnswerEdit] = useState(null);
    const [hint_edit,setHintEdit] = useState(null);
    const [trivia_edit,setTriviaEdit] = useState(null);
    const [message, setMessage] = useState("");
    const [levels,setLevels] = useState(null);
    const [difficulty_level,setDifficultyLevel] = useState(null);

    const fetchQuestion = useCallback(async() => {
        const triviaQuestion = await get(); 
        if( !triviaQuestion ) return;
        const levels = await getLevels();
        const {question,answer,hint,difficulty_level} = triviaQuestion;
        setLoading(false);    
        setTrivia({trivia,...triviaQuestion});
        setTriviaEdit( question);
        setAnswerEdit( answer);
        setHintEdit(hint);
        setDifficultyLevel( difficulty_level );
        setLevels(levels);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    useEffect(()=>{        
        fetchQuestion();
    },[fetchQuestion])

    const saveTriviaChanges = async() => {

        setMessage("");
        if( trivia_edit === "" ) setMessage("Question cannot be empty. ");
        else if( answer_edit === "" ) setMessage("Answer cannot be empty. ");
        else if( hint_edit === "" ) setMessage("Hint cannot be empty. ");
        else{
          const data = await put({question:trivia_edit,answer:answer_edit,hint:hint_edit,difficulty_level});
          if( !data ) return;
          setMessage(`Question has been edited and saved successfully. `);
        }
    }
    return trivia ?  (
        <div className="App">    
        <AuthHeader />
    <section className="hero">
        <div className="container">
            <p>Welcome to Scrambled Words Setup. Edit selected scrambled word question. </p>
            {
                    loading?(<p>Just a moment. Loading Trivia...</p> ):(    
                    <>
                    <h3> Edit Scrambled Question/Trivia</h3>

                    <div className="input-group">
                        <label htmlFor="hint">Difficulty Level</label>
                        <select defaultValue={difficulty_level} onChange={(e)=>setDifficultyLevel( e.target.value )}>
                            <option value="">Choose Difficulty Level</option>
                            {
                                levels.map( ({id,level,description,level_value})=>
                                    (<option key={id} value={level_value}>{level} ({description}) </option> ))
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="question">Question</label>
                        <input type="text" value={trivia_edit} onChange={(e)=>setTriviaEdit(e.target.value)}   />
                    </div>
                    <div className="input-group">
                        <label htmlFor="answer">Answer</label>
                        <input type="text" value={answer_edit} onChange={(e)=>setAnswerEdit(e.target.value)} />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="hint">Hint?</label>
                        <input type="text" value={hint_edit} onChange={(e)=>setHintEdit(e.target.value)} />
                    </div>
                    
                    <div className="input-group">
                        <Button name={loadingMessage} disabled={loading} onClick={saveTriviaChanges}  />
                    </div></>)                
                }
            <div>

            </div>
            <p>{ error ? error:message}</p>

        </div>
    </section>
    
      </div>
    ): (<> <p> an error occurred in loading this question</p> </>) 
}