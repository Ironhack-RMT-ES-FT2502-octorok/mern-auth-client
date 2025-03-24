import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"

function Login() {

  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {

    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui

    try {
      
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        email: email,
        password: password
      })

      console.log("usuario logeado", response)

      localStorage.setItem("authToken", response.data.authToken)

      // validar el token y saber quien es el usuario dueño del token. Actualizamos los estados.
      await authenticateUser()

      navigate("/private-page-example")

    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        console.log(error.response.status)
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // aqui hacemos navigate a /error
      }
    }

  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage !== null ? <p>{errorMessage}</p> : null}

      </form>
      
    </div>
  );
}

export default Login;
