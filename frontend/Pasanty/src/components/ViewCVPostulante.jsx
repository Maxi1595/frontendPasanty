import { useState, useEffect } from "react";
import { getCVByPostulacion } from "../api/postularseApi";
import { useParams } from "react-router-dom";


const ViewCVPostulante = () => {

    const { id } = useParams();
    const [cvUrl, setCvUrl] = useState(null);

    useEffect(() => {
        const fetchCV = async () => {
            const url = await getCVByPostulacion(id);
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

export default ViewCVPostulante;