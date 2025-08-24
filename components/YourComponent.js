import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"

function SoilData() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("soil_readings")   // table name in Supabase
        .select("*")
      if (error) console.error(error)
      else setData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Soil Readings</h2>
      <ul>
        {data.map((row) => (
          <li key={row.id}>
            {row.moisture} - {row.nutrients}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SoilData
