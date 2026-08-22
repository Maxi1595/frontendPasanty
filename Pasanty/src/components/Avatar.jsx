import { useState, useEffect } from "react";
import { getFotoUsuario } from "../api/usuarioApi";

const Avatar = ({ id, nombre, size = "w-24 h-24", textSize = "text-3xl" }) => {
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    getFotoUsuario(id)
      .then(url => setFoto(url))
      .catch(() => setFoto(null));
  }, [id]);

if (!foto) {
    return (
        <div className={`${size} rounded-full bg-green-500 flex items-center justify-center text-white font-bold ${textSize}`}>
            {nombre?.charAt(0).toUpperCase()}
        </div>
    );
}

  return (
    <img
      src={foto}
      alt="foto de perfil"
      className={`${size} rounded-full object-cover`}
    />
  );
};

export default Avatar;