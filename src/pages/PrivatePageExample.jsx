import { useEffect, useState } from 'react'
import service from '../services/config.services'

function PrivatePageExample() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...
      const response = await service.post("/auth/crear-una-banana")
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBanana = async () => {

    try {
      
      const response = await service.delete("/auth/borrar-una-banana-solo-admin")
      console.log(response)

    } catch (error) {
      console.log(error)
    }

  }

  // loading handler here

  return (
    <div>
      
      <h3>Ejemplo de página privada</h3>
      <p>Solo usuarios que hayan validado credenciales deberian poder acceder y ver la siguiente información:</p>

      <button onClick={handleDeleteBanana}>Borrar Banana (SOLO ADMIN)</button>

    </div>
  )
}

export default PrivatePageExample