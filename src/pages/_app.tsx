import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { NeedAuthentication } from '../components/auth';

type MyAppProps = AppProps & {
  session: Session;
};

function MyApp({ Component, pageProps, session }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <NeedAuthentication>
        <Component {...pageProps} />
      </NeedAuthentication>
    </SessionProvider>
  );
}

export default MyApp;
