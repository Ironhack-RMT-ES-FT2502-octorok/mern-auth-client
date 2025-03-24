import axios from "axios";
import { createContext, useEffect, useState } from "react";

// componente contexto => el que comparte los estados por al app
const AuthContext = createContext()

// componente wrapper => el que envuelve a la app y crea los estados
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ isAuthenticatingUser, setIsAuthenticatingUser ] = useState(true)

  useEffect(() => {
    // cuando un usuario entre por primera vez a la app, valida el token
    authenticateUser()
  }, [])

  async function authenticateUser() {
    // enviar el token al backend, validarlo y recibir la info del usuario dueño del token

    try {

      const authToken = localStorage.getItem("authToken")

      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      })

      console.log(response) // payload
      // si la llamada llega a este punto significa que el usuario fue correctamente validado
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      setIsAuthenticatingUser(false)
      
    } catch (error) {
      // si la llamada entra en el catch, significa que el usuario no pudo ser validado
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticatingUser(false)
    }

  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
  }

  if (isAuthenticatingUser === true) {
    return <h3>... validando usuario</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthWrapper,
  AuthContext
}