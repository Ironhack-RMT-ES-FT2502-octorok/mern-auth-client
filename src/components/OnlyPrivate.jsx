import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

// este componente envoltorio protege páginas privadas. Solo accesibles por usuario logeados.
function OnlyPrivate(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === true) {
    return props.children // si esta logeado, muestre la página
  } else {
    // en la base del componente no podemos usar el navigate de useNavigates
    return <Navigate to="/login"/> // si no está logeado, envialo a hacer login
  }

}

export default OnlyPrivate