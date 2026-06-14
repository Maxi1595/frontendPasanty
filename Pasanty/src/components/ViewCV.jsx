import { useState, useEffect } from "react";
import { getCV, getMyCV } from "../api/pasantesApi";
import { useParams } from "react-router-dom";

const ViewCV = ({ esPropio, id }) => {

  const [cvUrl, setCvUrl] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCV = async () => {
      return esPropio===true ? await getMyCV() : await getCV(id);
    }
    fetchCV()
    .then(url => setCvUrl(url))
    .catch(err => setError(err.message))
    .finally(() => setCargando(false));
}, []);

if (cargando) return <p>Cargando CV...</p>;
if (error) return <p>{error}</p>

return (
  <>
    {cvUrl && (
      <object
        data={cvUrl}
        type="application/pdf"
        width="100%"
        height="100%"
      >
      </object>
    )}
  </>
);
};

export default ViewCV;