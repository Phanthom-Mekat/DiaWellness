// import { useContext } from "react"
import { Link } from "react-router-dom"
// import { Context } from "./provider/context"

function App() {
  // const {name} = useContext(Context)
  return (
    <>
      {/* <h1>Welcome you are diabetes patient {name} </h1> */}
      <nav>
        <ul>
          <li><Link to="/patient">Patient</Link></li>
          <li><Link to="/doctor">Doctor</Link></li>
          <li><Link to="/nutritionist">Nutritionist</Link></li>
        </ul>
      </nav>

    </>
  )
}

export default App
