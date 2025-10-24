import { useState, useEffect } from "react";
import { getCV } from "../api/pasantesApi";

const ViewCV = () => {
  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      const url = await getCV(); // tu función del fetch
      setCvUrl(url);
    };
    fetchCV();
  }, []);

  return (
    <>
      {cvUrl && (
        <object data={cvUrl} type="application/pdf" width="50%" height="600px"></object>
      )}
    </>
  );
};

export default ViewCV;