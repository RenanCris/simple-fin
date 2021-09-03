import React, { ReactElement } from 'react'

interface Props {
    titulo:string;
}

export default function Header(head: Props): ReactElement {
    return (
        <header className="text-gray-600 body-font border-b-2 shadow md:shadow-lg bg-gradient-to-l from-indigo-50 to-blue-500 ">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
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
