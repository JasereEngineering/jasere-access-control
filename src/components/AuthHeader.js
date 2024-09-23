
export default function AuthHeader(){
    const  user = localStorage.getItem( "user");
    const  parseUser = JSON.parse(user) || {};
    const {username} = parseUser || {};
    return (
        <>
            <header class="header">
        <div class="container">
            <h1>Welcome, {username}</h1>
        </div>
    </header>
        </>

    )
}