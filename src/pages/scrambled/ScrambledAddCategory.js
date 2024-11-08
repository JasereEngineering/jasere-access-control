import Button from "../../components/Button";
import { useState } from "react";
import AuthHeader from "../../components/AuthHeader";
import useHttp from "../../hooks/useHttp";
export default function ScrambledAddCategory(){

    const {post,error,loading,loadingMessage} = useHttp('game/category/create',{loadMessage:'Create',loadedMessage:'Creating.....'});  
    const [category_name,setCategoryName] = useState("");
    const [category_description,setCategoryDescription] = useState("");
    const [message, setMessage] = useState("");
    const handleCategoryCreation = async(e) => {
        e.preventDefault();
        if( category_name === "" ) setMessage("Category Name cannot be empty. ");
        else{
          const data = await post({category_name,category_description,game_id:1});
          if( !data ) return;
          setMessage(`Category "${category_name}" has been created successfully. `);
        }
    }

    return (
        <div className="App">
        
<AuthHeader />

    <section className="hero">
        <div className="container">
            <p>Welcome to Scrambled Words Setup. Here you can manage categories and questions regarding scrambled words</p>
            <h3>Create Category</h3>
            <div>

            <div className="input-group">
                <label htmlFor="question">Category Name</label>
                <input type="text" value={ category_name } onChange={(e)=>setCategoryName(e.target.value)} />
            </div>
            <div className="input-group">
                <label htmlFor="answer">Category Description</label>
                <input type="text" value={category_description} onChange={(e)=>setCategoryDescription(e.target.value)} />
            </div>
        
            <div className="input-group">
                <Button name={loadingMessage} onClick={handleCategoryCreation} disabled={loading}  />
            </div>

            <p>{ error ? error:message}</p>

            </div>


        </div>
    </section>

    
      </div>
    )

}