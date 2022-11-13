import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addAll } from "../../store/proposicoesSlice";
import VisualizarProposicao from "../VisualizarProposicao/VisualizarProposicao";
import { findProposicoesByUsuarioId } from "../../shared/requests";
import Loader from "../Loader/Loader";

function TelaPrincipal() {
    const [loading, setLoading] = useState(false);
    const usuario = useSelector((state) => state.usuario);
    const proposicoes = useSelector((state) => state.proposicoes);
    const dispatch = useDispatch();

    const fetchProposicoes = async () => {
        setLoading(true);
        const res = await findProposicoesByUsuarioId(usuario.data.id);
        setLoading(false);
        dispatch(addAll(res.data));
    };

    useEffect(() => {
        fetchProposicoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ height: "100%" }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {proposicoes.data.length &&
                        proposicoes.data.map((item) => (
                            <VisualizarProposicao
                                key={item.id}
                                proposicao={item}
                                usuario={usuario}
                                fetchProposicoes={fetchProposicoes}
                            />
                        ))}
                </>
            )}
        </div>
    );
}

export default TelaPrincipal;