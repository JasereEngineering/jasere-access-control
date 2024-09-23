import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
export default function ScrambledCategory(){

    const navigate = useNavigate(); 
    const [loading,setLoading] = useState(true);
    const { get } = useHttp('game/categories',{loadMessage:'',loadedMessage:''});
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
        const fetchCategories = async() => {

            const categories = await get();
            setLoading(false);
            setCategories(categories);
        }
        fetchCategories();

    },[]);

    return (
        <div className="App">
        
        <AuthHeader />

    <section className="hero">
        <div className="container">
            <p>Welcome to Scrambled Words Setup. Here you can manage categories and questions regarding scrambled words</p>
            <h3>Manage Categories</h3>
            <Button name="(+) Add Category" onClick={() => navigate("/scrambled/category/create")}  />
            <nav class="nav">

                {
                    loading ? (<label>Loading Categories</label>): ( <ul>
                        {
                            categories.map( ({category_name,category_id})=>{
                                const link = `/scrambled/category/questions/${category_id}/${category_name}`;
                                return (<li><a href={link}>{category_name}</a></li>)
                            }
                                
                            )
                        }

                    </ul>)
                }                
            </nav>
        </div>
    </section>

      </div>
    )

}