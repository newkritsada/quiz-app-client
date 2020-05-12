import Head from "next/head";

const Layout = ({ children }) => (
  <div >
    <Head>
      <title>Quiz, just do it!</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="container mt-5 ">{children}</div>
  </div>
);

export default Layout;
