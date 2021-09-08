import tw from 'tailwind-styled-components';

export const Box = tw.div`
    p-8 lg:w-1/2 md:w-1/2
`
export const BoxContent = tw.div`
    flex border-2 rounded-lg border-gray-200 border-opacity-50 p-10 sm:flex-row flex-col
`
export const BoxIconContent = tw.div`
w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0
`