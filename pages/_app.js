import GlobalStyle from "../styles";
import useSWR from "swr";
import Layout from "../components/Layout.js";
import useStore from "@/store/artPieceInfoStore";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};


export default function App({ Component, pageProps }) {
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const addComment = useStore((state) => state.addComment);
  const artPiecesInfo = useStore((state) => state.artPiecesInfo);
  const { data, isLoading, error } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );

  return (
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        pieces={isLoading || error ? [] : data}
       
      />
    </Layout>
  );
}
