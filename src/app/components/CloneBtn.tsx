class Props {
    acao:any;
    extenderClass?:string = "";
}

export const CloneBtn = (props: Props) => {

    const classEstilo = `${props.extenderClass} w-5 h-4 mr-auto cursor-pointer hover:text-blue-300`;

    return (
        <div className="flex items-center mt-3">
            <svg  
            onClick={props.acao}
            className={classEstilo} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        </div>
    )
}

