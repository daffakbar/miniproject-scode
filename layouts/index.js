import Head from "next/head";
import dynamic from "next/dynamic";
// const HeaderComponent = dynamic(() => import("@/components/header"));
const MenuComponent = dynamic(() => import("@/components/menu"));
const HeaderComponent = dynamic(() => import("@/components/header"));

export default function Layout({
  children,
  metaTitle,
  metaDescription,
  metaKeyword,
}) {
  return (
    <div className="container mx-aut">
      <Head>
        <title>{`Notes App - ${metaTitle}`}</title>
        <meta name="description" content={metaDescription || "Notes App"} />
        <meta name="keywords" content={metaKeyword || "Notes App"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div>{children}</div>
      <MenuComponent />
    </div>
  );
}
