import { useState, useEffect } from "react";
import { getMyCV } from "../api/pasantesApi";


const MyCV = () => {

  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      const url = await getMyCV(); // tu función del fetch
      setCvUrl(url);
    };
    fetchCV();
  }, []);

  return (
    <>
      {cvUrl !== null ? (
        <object 
        data={cvUrl} 
        type="application/pdf" 
        width="100%" 
        height="100%"
        >
        </object>
      ) : (
        <p>El pasante no ha subido su CV</p>
      )}
    </>
  );
};

export default MyCV;