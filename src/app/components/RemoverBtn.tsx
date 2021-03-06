
class Props {
    acao:any;
    extenderClass?:string = "";
    exibirTitulo?:boolean = false;
}

export const RemoverBtn = (props: Props) => {

    const classEstilo = `${props.extenderClass} w-5 h-4 mr-auto cursor-pointer hover:text-red-500`;

    return (
        <div className="flex items-center mt-3">
            { props.exibirTitulo ? <span className="text-sm">Remover:</span> : ""}
            <svg 
                onClick={props.acao}
                className={classEstilo} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    )
}
