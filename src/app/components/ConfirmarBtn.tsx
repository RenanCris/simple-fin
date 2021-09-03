import React from 'react'

interface Props {
    acao:any;
    desabilitado:boolean;
}

export const ConfirmarBtn = (props: Props) => {
    const classBotao = `flex items-center  text-white ${props.desabilitado ? "bg-blue-100" : "bg-blue-400"} 
            border-0 py-2 px-4 w-1/2 focus:outline-none ${props.desabilitado ? "" : "hover:bg-blue-500"} rounded`;

    return (
        <button 
            onClick={props.acao}
            disabled={props.desabilitado}
            className={classBotao}>Confirmar
            <svg  className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
    </button>
    )
}
