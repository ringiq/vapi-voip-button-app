import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { RealmProvider } from '@/context/RealmContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RealmProvider>
      <Component {...pageProps} />
    </RealmProvider>
  );
}
