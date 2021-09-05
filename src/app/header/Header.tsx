import React, { ReactElement } from 'react'

interface Props {
    titulo:string;
}

export default function Header(head: Props): ReactElement {
    return (
        <header className="text-gray-600 body-font border-b-2 shadow md:shadow-lg bg-gradient-to-l from-indigo-50 to-blue-500 ">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg  className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-3 text-xl">{head.titulo}</span>
                </div>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    {/* <a className="mr-5 hover:text-gray-900 text-white">First Link</a>
                    <a className="mr-5 hover:text-gray-900 text-white">Second Link</a>
                    <a className="mr-5 hover:text-gray-900 text-white">Third Link</a>
                    <a className="mr-5 hover:text-gray-900 text-white">Fourth Link</a> */}
                </nav>
            </div>
        </header>
    )
}
