import axios from "axios";

// creamos el servicio que gestionará todas las llamadas al BE
const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

// axios nos recomienda hacer la configuracion de enviar tokens de esta manera por seguridad
// con esto nos aseguramos que en todas las llamadas vendrá acompañado el token
service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken")
  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }
  return config
})

export default service