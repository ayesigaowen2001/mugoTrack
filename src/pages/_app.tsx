// pages/_app.js
import { AnimalProvider } from "../app/components/customerResourcesContext";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return <AnimalProvider><Component {...pageProps} /></AnimalProvider>;
}
