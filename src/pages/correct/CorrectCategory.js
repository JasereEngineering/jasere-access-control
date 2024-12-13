import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import useHttp from "../../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
export default function CorrectCategory(){

    const navigate = useNavigate(); 
    const [loading,setLoading] = useState(true);
    const { get } = useHttp('game/categories/3',{loadMessage:'',loadedMessage:''});
    const [categories,setCategories] = useState([]);

    const fetchCategories = useCallback(async() => {
        const categories = await get();
        setLoading(false);
        setCategories(categories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    useEffect(()=>{
        
        fetchCategories();

    },[fetchCategories]);

    console.log( categories );


    return (
        <div className="App">
        
        <AuthHeader />

    <section className="hero">
        <div className="container">
            <p>Welcome to Correct Setup. Here you can manage categories and questions regarding correct</p>
            <h3>Manage Categories</h3>
            <Button name="(+) Add Category" onClick={() => navigate("/correct/category/create")}  />
            <nav className="nav">

                {
                    loading ? (<label>Loading Categories</label>): ( <ul>
                        {
                            categories.map( ({category_name,category_id,id})=>{
                                const link = `/correct/category/questions/${category_id}/${category_name}`;
                                return (<li key={id}><Link to={link}>{category_name}</Link></li>)
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