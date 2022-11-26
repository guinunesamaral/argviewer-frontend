import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addAll } from "store/proposicoesSlice";
import VisualizarProposicao from "../VisualizarProposicao/VisualizarProposicao";
import { findProposicoesByUsuarioId } from "utils/requests";
import Loader from "../Loader/Loader";
import BigPlusProposicao from "../Plus/BigPlusProposicao";
import "./TelaPrincipal.css";

function TelaPrincipal() {
    const dispatch = useDispatch();
    const usuarioPlataforma = useSelector((state) => state.usuario.data);
    const proposicoes = useSelector((state) => state.proposicoes);
    const [loading, setLoading] = useState(false);

    const fetchProposicoes = async () => {
        setLoading(true);
        const res = await findProposicoesByUsuarioId(usuarioPlataforma.id);
        setLoading(false);
        dispatch(addAll(res.data));
    };

    useEffect(() => {
        fetchProposicoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="telaPrincipal">
            {loading ? (
                <Loader message="Buscando proposições" />
            ) : proposicoes.data.length ? (
                <div>
                    {proposicoes.data.map((item) => (
                        <VisualizarProposicao
                            key={item.id}
                            proposicao={item}
                            usuarioReferencia={usuarioPlataforma}
                            fetchProposicoes={fetchProposicoes}
                        />
                    ))}
                    <BigPlusProposicao />
                </div>
            ) : (
                <BigPlusProposicao />
            )}
        </div>
    );
}

export default TelaPrincipal;
