import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { goToCriarProposicao } from "../../shared/navigations";

const BigPlusProposicao = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <FontAwesomeIcon
                className="c-pointer"
                icon="fa-solid fa-plus"
                color="white"
                size="10x"
                onClick={goToCriarProposicao.bind(this, navigate)}
            />
        </div>
    );
};

export default BigPlusProposicao;
