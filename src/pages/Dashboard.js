import { Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
export default function Dashboard(){
    
    return (
        <div className="App">

            <AuthHeader />
    

    <section class="hero">
        <div class="container">
            <p>Welcome to the admin control panel. Manage users, roles, and system settings with ease.</p>
            <nav class="nav">
                <ul>
                    <li><Link to="/dashboard/scrambled/categories">Scrambled Words</Link></li>
                    <li><Link to="/dashboard/correct/categories">Correct!</Link></li>
                    <li><Link to="#">Lemon</Link></li>
                    <li><Link to="#">Role Management</Link></li>
                    <li><Link to="#">System Settings</Link></li>
                    <li><Link to="#">Logout</Link></li>
                </ul>
            </nav>
        </div>
    </section>

    
      </div>
    )

}