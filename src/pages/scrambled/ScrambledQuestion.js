import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import AuthHeader from "../../components/AuthHeader";
import useHttp from "../../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";
export default function ScrambledQuestion(){

    const navigate = useNavigate(); 
    const {category_id,category_name} = useParams();
    const [loading,setLoading] = useState(true);
    const { get } = useHttp(`game/questions/${category_id}`,{loadMessage:'',loadedMessage:''});
    const [questions,setQuestions] = useState([]);

    const fetchQuestions = useCallback(async() => {
        const questions = await get();    
        setLoading(false);    
        setQuestions(questions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    useEffect(()=>{        
        fetchQuestions();
    },[fetchQuestions]);

    console.log("testing");

    return (
        <>
            <div className="App">
            
                <section className="hero">
            

                    <div className="container">
                    <AuthHeader />
                    <p>Welcome to Scrambled Words Setup. Here you can manage categories and questions regarding scrambled words</p>
                        <h3>{category_name} - Manage Questions</h3>
                        <Button name="(+) Add Question" onClick={()=>navigate(`/scrambled/category/question/add/${category_id}/${category_name}`)}  />
                    
                    </div>
                </section>
            </div>

            {

loading ? (<label>Loading Questions</label>): ( <table>
    <thead>
        <tr>
            <th>#</th>
            <th>Question</th>
            <th>Hint</th>
            <th>ANSWER</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    {
        questions.map( ({id,question,answer,hint},index)=>{
            return ( <tr key={id}>
                <td>{index+1}</td>
                <td>{question}</td>
                <td>{hint}</td>
                <td>{answer.toUpperCase()}</td>
                <td>
                    <p><Button name="Edit" /></p>
                    <p><Button name="Delete" /></p>
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