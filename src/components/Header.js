import logo from '../img/jasere-logo.png';
import '../App.css';

export default function Header(){

    return (
        <>
        <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Jasere | Login To JAC</h2>
      </header>
        </>
    )

}
