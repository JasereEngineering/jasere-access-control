import { Link } from "react-router-dom";
export default function Home(){

    return (
        <div className="App">
        
        <header class="header">
        <div class="container">
            <h1>Admin Access Control</h1>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <p>Welcome to the admin control panel. Manage users, roles, and system settings with ease.</p>
            <Link to="/login">Get Started</Link>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <div class="feature">
                <h3>User Management</h3>
                <p>Manage users, set permissions, and control access levels.</p>
            </div>
            <div class="feature">
                <h3>Role Management</h3>
                <p>Define roles and assign them to users to control what they can do.</p>
            </div>
            <div class="feature">
                <h3>System Settings</h3>
                <p>Configure system-wide settings and ensure secure operations.</p>
            </div>
        </div>
    </section>

    
      </div>
    )

}