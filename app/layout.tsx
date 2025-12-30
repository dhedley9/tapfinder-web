import "./globals.css";
import { googleSans } from '@/app/ui/fonts';

export default function RootLayout( { children }: Readonly<{children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={googleSans.className}>
                {children}
            </body>
        </html>
    );
}
