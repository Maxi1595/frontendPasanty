import instance from "./api";

export const getEmpresaById = async (id) => {
    const empresa = await instance.get(`/empresa/buscar/${id}`);

    return empresa;
}