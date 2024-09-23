import { useContext } from "react"
import { AppContext, CreateUserContext } from "../CreateUserContext"

export default function AnotherPage(){
    const egg = useContext(AppContext);
    console.log( egg );
     return (
        <h1>Another Page</h1>
     )
}