import { Montserrat, Google_Sans } from 'next/font/google';

export const montserrat = Montserrat( { subsets: ['latin'] } );

export const googleSans = Google_Sans( { 
    subsets: ['latin'],
    display: 'swap',
    fallback: [ 'Helvetica', 'sans-serif'],
} );