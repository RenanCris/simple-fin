import React, { ReactElement } from 'react'

interface Props {
    
}

export default function Usuario(data: Props): ReactElement {
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
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Renan Cris</h2>
                    <p className="leading-relaxed text-base">Controle de gastos financeiros</p>
                    <p className="font-black text-sm ">Última atualização:</p>
                </div>
            </div>
        </div>
    )
}
