import React, { ReactElement, useEffect, useState } from 'react'
import Api from '../api/Api';
import { useAppDispatch, useAppSelector } from '../hooks';
import moment from "moment";
import { indicarUsuario } from '../redux/usuario.slice';
import { RemoverBtn } from '../components/RemoverBtn';
import { StorageBrowser } from '../util/StorageBrowser';

interface Props {
    
}

export default function Usuario(dados: Props): ReactElement {

    const pagamentoState = useAppSelector((state) => state.pagamento);
    const usuarioState = useAppSelector((state) => state.usuario);
    const [data, setData] = useState('');
    const [usuario, setUsuario] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!pagamentoState.usuario) return; 

        Api.get(`ultima-atualizacao/${pagamentoState.usuario}/ano/${pagamentoState.ano}`).then(res =>{
            if(res.data)
            setData(moment(res.data).format('DD/MM/YYYY HH:mm:ss'));
        });
    }, [pagamentoState])

    useEffect(() => {
        dispatch(indicarUsuario({nome:StorageBrowser.getStorageValue('usuario')}))
      }, [])

    const handleUsuario = (usuario: React.FormEvent<HTMLInputElement>) =>{
        const {value, name} = usuario.currentTarget; 
        setUsuario(value);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          handleAdd();
        }
    };

    const handleAdd = () => {
        StorageBrowser.setStorageValue('usuario', usuario);
        dispatch(indicarUsuario({nome:usuario}))
    };

    const handleRemoverUsuario = () =>{
        StorageBrowser.setStorageValue('usuario', '');
        dispatch(indicarUsuario({nome:''}))
    }

    return (
        <div className="p-8 lg:w-1/2 md:w-1/2">
            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-10 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0">
                    <svg fill="none" stroke="currentColor"  className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div className="flex-grow ">
                    {
                        !usuarioState.nome ? <div className="py-2 w-full">
                            <div className="relative">
                                <label  className="leading-7 text-sm text-gray-600">Nome</label>
                                <input type="text"  value={usuario} onChange={handleUsuario} onKeyDown={handleKeyDown} className="w-full bg-gray-50 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        :
                        <div className="flex ">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{usuarioState.nome}</h2>
                            <RemoverBtn acao={handleRemoverUsuario} exibirTitulo={false} extenderClass="relative left-4 mb-3"></RemoverBtn>
                        </div> 
                    }
                    
                    <p className="leading-relaxed text-base">Controle de gastos financeiros</p>
                    <p className="text-sm ">Última atualização: <span className="font-black"> {data}</span></p>
                </div>
            </div>
        </div>
    )
}
