import { useState, useEffect } from "react";
import { getCV } from "../api/pasantesApi";
import { useParams } from "react-router-dom";

const ViewCV = () => {

  const { id } = useParams();
  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      const url = await getCV(id); // tu función del fetch
      setCvUrl(url);
    };
    fetchCV();
  }, []);

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