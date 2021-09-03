import React, { ReactElement } from 'react'

interface Props {
    
}

export default function Resumo(data: Props): ReactElement {
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
                    <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                </div>
            </div>
        </div>
    )
}
