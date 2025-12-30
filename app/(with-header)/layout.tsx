import Header from "@/app/ui/header";

export default function Layout( { children }: { children: React.ReactNode; } ) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}