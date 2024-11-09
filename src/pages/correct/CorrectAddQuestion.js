import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import useHttp from "../../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";
import AuthHeader from "../../components/AuthHeader";
export default function CorrectAddQuestion(){

    const {post,error,loading,loadingMessage} = useHttp('game/correct-trivia/create',{loadMessage:'Create',loadedMessage:'Creating.....'});  
    const { get } = useHttp(`game/difficulty/levels`,{loadMessage:'',loadedMessage:''});
    const [file, setFile] = useState(null);
    const {category_id,category_name} = useParams();
    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");
    const [hint, setHint] = useState("");
    const [options,setOptions] = useState([])
    const [message, setMessage] = useState("");
    const [question_type,setQuestionType] = useState("");
    const [difficulty_level,setDifficultyLevel] = useState(null);
    const [levels,setLevels] = useState([]);
    const [time,setTime] = useState(0);

    const handleQuestionCreation = async(e) => {
        e.preventDefault();
        if( difficulty_level === "" ) setMessage("Please choose a difficulty level. ");
        else if( question_type === "" ) setMessage("Please choose a question type. ");
        else if( question === "" ) setMessage("Question cannot be empty. ");
        else if( answer === "" ) setMessage("Answer cannot be empty. ");
        else if( options.length !== 4 ) setMessage("Number of options must be 4");           
        else{

            const formData = new FormData();
            formData.append('file', file);
            formData.append( 'difficulty_level', difficulty_level );
            formData.append('question_type',question_type);
            formData.append('question',question);
            formData.append('answer',answer);
            formData.append('options',JSON.stringify(options));
            formData.append('category_id',category_id);
            formData.append('time',time);

            const data = await post(formData);
            if( !data ) return;
            setMessage(`Question has been created successfully. `);
        
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    // const handleUpload = async () => {
    //     const {post,error,loading,loadingMessage} = useHttp('files/upload',{loadMessage:'Create',loadedMessage:'Creating.....'});
    //     if (!file) return;
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     try {
    //         const data = await post(formData,{'Content-Type': 'multipart/form-data'});
    //         console.log( data );
 
    //     //   setUploadStatus(`File uploaded successfully: ${response.data.url}`);
    //     } catch (error) {
    //     //   setUploadStatus(`Error uploading file: ${error.message}`);
    //     }
    //   };

    const fetchLevels = useCallback(async() => {
        const levels = await get();        
        setLevels(levels);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
  
    useEffect(()=>{        

        fetchLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fetchLevels])

    const setOptionsValue = (value,index) => {
        const tempOptions = [...options]
        tempOptions[index] = value;
        setOptions(tempOptions);
    }

    return (
        <div className="App">
        
        <AuthHeader />

    <section className="hero">
        <div className="container">

            <p>Welcome to Correct Setup. Here you can manage categories and questions regarding scrambled words</p>
            <h3>{category_name} - Create Correct Question</h3>
            <div>

            <div className="input-group">
                <label htmlFor="question">Question Type</label>
                <select onChange={(e)=>setQuestionType(e.target.value)}>
                    <option value="">Select Question Type:</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="audio">Audio</option>
                </select>
            </div>

            <div className="input-group" style={{ display: (question_type === "image" || question_type === "audio") ? "block":"none"}  }>
                <label htmlFor="question">Upload File</label>
                <input type="file"  onChange={handleFileChange} />
            </div>

            <div className="input-group">
                        <label htmlFor="hint">Difficulty Level</label>
                        <select onChange={(e)=>setDifficultyLevel( e.target.value )}>
                            <option value="">Choose Difficulty Level</option>
                            {
                                levels.map( ({id,level,description,level_value})=>
                                    (<option key={id} value={level_value}>{level} ({description}) </option> ))
                            }
                        </select>
            </div>

            <div className="input-group">
                <label htmlFor="question">Question</label>
                <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}   />
            </div>
            <div className="input-group">
                <label htmlFor="answer">Answer</label>
                <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
            </div>
            
            <div className="input-group">
                <label htmlFor="answer">Option 1</label>
                <input type="text" value={options[0]} onChange={(e)=>setOptionsValue(e.target.value,0)} />
            </div>
            
            <div className="input-group">
                <label htmlFor="answer">Option 2</label>
                <input type="text" value={options[1]} onChange={(e)=>setOptionsValue(e.target.value,1)} />
            </div>

            <div className="input-group">
                <label htmlFor="answer">Option 3</label>
                <input type="text" value={options[2]} onChange={(e)=>setOptionsValue(e.target.value,2)} />
            </div>

            <div className="input-group">
                <label htmlFor="answer">Option 4</label>
                <input type="text" value={options[3]} onChange={(e)=>setOptionsValue(e.target.value,3)} />
            </div>

            <div className="input-group">
                <label htmlFor="hint">Hint?</label>
                <input type="text" value={hint} onChange={(e)=>setHint(e.target.value)} />
            </div>

            <div className="input-group">
                <label htmlFor="hint">Time?</label>
                <input type="number" value={time} onChange={(e)=>setTime(e.target.value)} />
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