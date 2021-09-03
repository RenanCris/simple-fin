import React, { ReactElement } from 'react'
import { useAppDispatch } from '../../hooks';
import { Itens, mudarSituacaoItem, removerItem } from '../../redux/pagamento.slice'

interface Props {
    item:Itens
    key:number;
}

export default function ItemLancamento(data: Props): ReactElement {
    const dispatch = useAppDispatch();

    const handleRemoverLancamento = () =>{
        dispatch(removerItem(data.item))
    }

    const handleMudarSituacao = () =>{
        dispatch(mudarSituacaoItem(data.item))
    }

    const classItemMarcacao = `w-4 h-4 mr-2 inline-flex items-center justify-center ${data.item.pago ? "bg-green-300": "bg-yellow-300"} text-white rounded-full flex-shrink-0`

    return (
        <p className="flex items-center text-gray-600 mb-2">
            <span 
                onClick={handleMudarSituacao}
                className={classItemMarcacao}>
                <svg fill="none" stroke="currentColor"  className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{data.item.descricao} ({data.item.valor})    
            <svg 
                onClick={handleRemoverLancamento}
                className="absolute right-6 w-5 h-4 mr-auto cursor-pointer hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg> 
        </p>
    )
}
