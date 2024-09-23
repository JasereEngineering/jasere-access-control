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
                    <li><a href="/dashboard/scrambled/categories">Scrambled Words</a></li>
                    <li><a href="#">Lemon</a></li>
                    <li><a href="#">Role Management</a></li>
                    <li><a href="#">System Settings</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </nav>
        </div>
    </section>

    
      </div>
    )

}