import React, { useEffect, useMemo } from 'react';
import Header from './app/header/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import imgPay from './app/img/pay.png';
import MesInclusao from './app/pagamento/inclusao-mes/MesInclusao';
import Lancamento from './app/pagamento/lancamentos/Lancamento';
import Resumo from './app/resumo-valores/Resumo';
import Usuario from './app/usuario/Usuario';
import _lodash from "lodash";
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from './app/api/Api';
import { indicarConfiguracaoBasicaPagamento, indicarLancamento } from './app/redux/pagamento.slice';
import { io, Socket } from 'socket.io-client';

function App() {

  const pagamentoState = useAppSelector((state) => state.pagamento);
  const usuarioState = useAppSelector((state) => state.usuario);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const usuario = usuarioState.nome;
    const ano = 2021;
    
    dispatch(indicarConfiguracaoBasicaPagamento({usuario: usuario, ano: ano}));

    if(!usuario) return;

    Api.get(`${usuario}/ano/${ano}`).then(res =>{
      if(res.data)
      [...res.data["lancamentos"]].forEach(lancamento=> {
        dispatch(indicarLancamento(lancamento));
      });
    });
    
    
  }, [usuarioState])

  const socket = useMemo<Socket>(() => io('http://localhost:3001', {transports: ['websocket', 'polling', 'flashsocket']}), [])

  useEffect(() => {
    socket.emit('lancamento-pagamento',pagamentoState);
  }, [pagamentoState.lancamentos])

  useEffect(() => {
    socket.on('connect', () =>{
      toast.success('Servidor Concectado!', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    });
  }, [socket])

  return (
    <div>
      <Header titulo="Simple Fin"></Header>
      <section className="bg-gray-200 bg-opacity-25 max-h-px overflow-y-scroll conteudo ">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-row -m-4 bg-white shadow-md rounded-lg">
              <div className="p-4 lg:w-1/4">
                <div className="flex rounded-lg border-opacity-50 p-4 justify-center sm:flex-row flex-col ">
                  <img src={imgPay} className="h-40" alt="pagamento painel"></img>
                </div>
              </div>
              <Usuario></Usuario>
              <Resumo></Resumo>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 pt-7 pb-10 mx-auto">
            <div className="flex flex-wrap -m-4 bg-white shadow-md rounded-lg">
              <MesInclusao></MesInclusao>
              {
                _lodash.orderBy(pagamentoState.lancamentos,['mes'],['desc'])
                .map((lan,index) => (
                  <Lancamento key={index} numero={index} lancamento={lan}></Lancamento>
                ))
              }
            </div>
          </div>
        </section>
      </section>
      <ToastContainer position="bottom-left"/>
    </div>
  );
}

export default App;
