import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext, CreateUserContext } from "../CreateUserContext";


export default function Profile(  ){

    const location = useLocation();
    const egg = useContext( AppContext );
    console.log( egg );
    return (

        <CreateUserContext.Provider value={location.state}>
            <h1>Profile Page</h1>
            <Link to="/another">Another Page </Link>
        </CreateUserContext.Provider>
                
    )

}