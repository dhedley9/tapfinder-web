import Image from 'next/image';
import Link from 'next/link';
import { googleSans } from './fonts';

export default function Header() {

    const links = [
        {
            name: 'For you',
            href: '/myaccount',
        },
        {
            name: 'Discover',
            href: '/discover',
        },
         {
            name: 'About Us',
            href: '/about',
        }
    ];

    return (
        <header className={ 'tf-header ' + googleSans.className }>
            <div className="tf-content-wrap">
                <Link href={`/`} className="tf-header-logo">
                    <Image
                        src="/tapfinder-logo-split-alt.png"
                        width={1000}
                        height={257}
                        alt="TapFinder logo"
                    />
                </Link>

                <nav className="tf-header-menu">
                    <ul>
                        { links.map( ( link ) => (
                            <li key={link.name}>
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="tf-header-actions">
                    <Link href={`/login`} className="tf-button">
                        Sign In
                    </Link>
                </div>
            </div>
        </header>
    );
}