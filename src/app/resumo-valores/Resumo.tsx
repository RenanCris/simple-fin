import React, { ReactElement, useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Api from '../api/Api';
import { useAppSelector } from '../hooks';
import _lodash from "lodash";
import moment from "moment";

interface Props {
    
}

export default function Resumo(data: Props): ReactElement {
    const pagamentoState = useAppSelector((state) => state.pagamento);
    const [dados, setDados] = useState([{}]);

    useEffect(() => {
      if(!pagamentoState.usuario) return;

      Api.get(`totais/${pagamentoState.usuario}/ano/${pagamentoState.ano}`).then(res =>{
        if(res.data[0]){
          let _dadosOrdenados =  _lodash.orderBy(res.data[0]["despesas"],['mes'],['desc']).map(dados =>{
            dados['mesDesc'] = moment(new Date(pagamentoState.ano,parseInt(dados['mes']) -1)).format('MMM/YY');
            return dados;
          });
          setDados(_dadosOrdenados);
        }
      });
    }, [pagamentoState])

    return (
        <div className="p-8 lg:w-1/2 md:w-1/2">
            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-10 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2} className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Resumo</h2>
                    <LineChart
                        width={550}
                        height={200}
                        data={dados}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mesDesc" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="total" dataKey="sum" stroke="#82ca9d" />
                        </LineChart>
                </div>
            </div>
        </div>
    )
}
