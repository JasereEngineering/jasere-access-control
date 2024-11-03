import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import AuthHeader from "../../components/AuthHeader";
import useHttp from "../../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";
export default function CorrectQuestion(){

    const navigate = useNavigate(); 
    const {category_id,category_name} = useParams();
    const [loading,setLoading] = useState(true);
    const { get } = useHttp(`game/questions/${category_id}`,{loadMessage:'',loadedMessage:''});
    const [questions,setQuestions] = useState([]);
    const [loadingMessage,setLoadingMessage] = useState("Delete");
    const fetchQuestions = useCallback(async() => {
        const questions = await get();
        console.log( questions );    
        setLoading(false);    
        setQuestions(questions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    useEffect(()=>{        
        fetchQuestions();
    },[fetchQuestions]);


    const deleteQuestion = async (id) => {
        const confirm = window.confirm( `Are you sure you want to delete this trivia?` );
        if( !confirm ) return;
        const BASE_URL = process.env.REACT_APP_ACCESS_CONTROL_API_URL || "";
        const endpoint = `game/question/delete/${id}`;
        const put = async (payload) => {
            setLoadingMessage( "Deleting.." );
            try{
              const url = `${BASE_URL}${endpoint}` || "";
              const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
      
            const result = await response.json();
            const {message} = result;
            if( !response.ok ) throw new Error( message );
            return result;
      
            }
            catch(e){
            }
            finally{
            //   setLoading( false);
            //   setLoadingMessage( loadMessage );
            setLoadingMessage( "Delete" );
            }
          
        }
        const result = await put({isActive:false});
        if( !result ) alert(`error occurred in deleting trivia. `);
        else alert( `trivia has been deleted successfully. refresh page to see the changes. `);

    }

    return (
        <>
            <div className="App">
                <section className="hero">
                    <div className="container">
                    <AuthHeader />
                    <p>Welcome to Correct Setup. Here you can manage categories and questions regarding scrambled words</p>
                        <h3>{category_name} - Manage Questions</h3>
                        <Button name="(+) Add Question" onClick={()=>navigate(`/correct/category/question/add/${category_id}/${category_name}`)}  />
                    
                    </div>
                </section>
            </div>

            {

loading ? (<label>Loading Questions</label>): ( <table>
    <thead>
        <tr>
            <th>#</th>
            <th>DIFFICULTY</th>
            <th>Question</th>
            <th>Question Type</th>
            <th>URL</th>
            <th>ANSWER</th> 
            <th>TIME</th>      
            <th></th>
        </tr>
    </thead>
    <tbody>
    {
        questions.map( ({id,question,answer,difficulty_level,time,question_type,asset_uri},index)=>{
            console.log(asset_uri);
            return ( <tr key={id}>
                <td>{index+1}</td>
                <td>{difficulty_level.toUpperCase()}</td>
                <td>{question}</td>
                <td>{ question_type.toUpperCase() }</td>
                <td><a href={asset_uri} target="_blank" rel="noreferrer">Click here to view</a></td>
                <td>{answer.toUpperCase()}</td>
                <td>{time}</td>
                <td>
                    <p><Button name="Edit" onClick={ ()=>{
                        alert("coming soon");
                        //navigate(`/correct/question/edit/${id}`) 
                        
                        }} /></p>
                    <p><Button name={loadingMessage} onClick={ () => deleteQuestion(id) } /></p>
                </td>
            </tr>)
        }
            
        )
    }

</tbody>
</table>)

}
      </>
    )

}