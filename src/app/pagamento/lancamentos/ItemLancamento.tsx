import React, { ReactElement } from 'react'
import { CloneBtn } from '../../components/CloneBtn';
import { MoedaFormat } from '../../components/MoedaFormat';
import { RemoverBtn } from '../../components/RemoverBtn';
import { useAppDispatch } from '../../hooks';
import { Itens, mudarSituacaoItem, removerItem } from '../../redux/pagamento.slice'

interface Props {
    item:Itens
    key:number;
    cloneFilho:(item:Itens) => void;
}

export default function ItemLancamento(data: Props): ReactElement {
    const dispatch = useAppDispatch();

    const handleRemoverLancamento = () =>{
        dispatch(removerItem(data.item))
    }

    const handleMudarSituacao = () =>{
        dispatch(mudarSituacaoItem(data.item))
    }

    const handleClonarParaEditar = () =>{
        data.cloneFilho(data.item);
    }

    const classItemMarcacao = `w-4 h-4 mr-2 inline-flex items-center justify-center ${data.item.pago ? "bg-green-300": "bg-yellow-300"} text-white rounded-full flex-shrink-0`

    return (
        <div className="flex items-center text-gray-600 mb-2">
            <span 
                onClick={handleMudarSituacao}
                className={classItemMarcacao}>
                <svg fill="none" stroke="currentColor"  className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{data.item.descricao} ({<MoedaFormat valor={data.item.valor}></MoedaFormat>})    
           
            <CloneBtn acao={handleClonarParaEditar} extenderClass="absolute right-11"></CloneBtn>
            <RemoverBtn acao={handleRemoverLancamento} extenderClass="absolute right-6"></RemoverBtn>
        </div>
    )
}
