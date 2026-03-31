import Register from "./pages/Register.jsx";
import Codedashboard from "./pages/Codedashboard.jsx";
import Section1img from "./assets/app_logos/section1 img.png";
import Arrayimg from "./assets/app_logos/section2 arrays img.png";
import Stringimg from "./assets/app_logos/section2 strings.png";
import dpimg from "./assets/app_logos/section2 dp.png";
import treesimg from "./assets/app_logos/section2 trees.png";
import "./App.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function App(){

  const navigate = useNavigate();
  return(
    <>
    
    <div className="introduction">
      <div className="section1">
        <h1>Master Algorithms Ace Interviews.</h1>
        <h3>Your Journey to technical excellemce starts here. Practice thosands of <br />
        problems from companies like Google And Meta.</h3><br />
        <Link to="/Signup" className="btn"><button>Start Practice</button></Link>
      </div>

      <div className="section2">
        <img src={Section1img} alt="" />
      </div>
    </div>

    <div className="sections">
      <div className="titled">
        <h1>Problem Cateogaries</h1>
      </div>

      <div className="list">
        <div className="listitems">
          <img src={Arrayimg} alt="" />
          <h2>Arrays</h2>
          <p>Solve the Array problems Easy-hard</p>
        </div>

        <div className="listitems">
          <img src={Stringimg} alt="" />
          <h2>Strings</h2>
          <p>Solve the Strings problems Easy-hard</p>
        </div>

        <div className="listitems">
          <img src={dpimg} alt="" />
          <h2>Dynamic Programming</h2>
          <p>Solve the Dyanamic Programming problems Easy-hard</p>
        </div>

        <div className="listitems">
          <img src={treesimg} alt="" />
          <h2>Trees</h2>
          <p>Solve the Trees problems Easy-hard</p>
        </div>

      </div>
    </div>



















    </>
  )
}

export default App;