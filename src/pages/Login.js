import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";


export default function Login(){
  const {post,error,loading,loadingMessage} = useHttp('auth/login',{loadMessage:'Login',loadedMessage:'Authenticating.....'});  
  const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleAuthLogin = async(e) => {
      e.preventDefault();
      if( username === "" ) setErrorMessage("Username cannot be empty. ");
      else if( password === "" ) setErrorMessage("Password cannot be empty. ");
      else{
        const data = await post({username,password});
        if( !data ) return;


        const { result,access_token,refresh_token } = data;
        localStorage.setItem( "user", JSON.stringify(result) );
        localStorage.setItem( "access_token", access_token );
        localStorage.setItem( "refresh_token", refresh_token);
        
        navigate( "/dashboard" );
      }
    }

    return (
        <>

        <div className="login-container">
          
        <h2>Login to Access Control</h2>       
        <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" value={username} onChange={ (e)=>setUsername(e.target.value) }  />
        </div>
        <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={ (e)=>setPassword(e.target.value) } />
        </div>
        
        <Button name={loadingMessage} onClick={handleAuthLogin} disabled={loading}  />
        
        {/* <button type="submit">Login</button> */}
        <p>{ errorMessage ? errorMessage: error}</p>
    </div>

            {/* <div className="App">
                <Header />

                <div>
                <label>Username:</label><br />
                <input type="text" value={username} onChange={ (e)=>setUsername(e.target.value) } />
                </div>
                <br />
                <div>
                    <label>Password:</label><br />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <br />

                <Button name={loadingMessage} onClick={handleAuthLogin} disabled={loginDisabled}  />

                <br />
                <br />

                <label>{  errorMessage} </label>
            </div> */}
        </>
    )
}