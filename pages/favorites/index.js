import ArtPieces from "../../components/ArtPieces";
import useStore from "@/store/artPieceInfoStore";

export default function FavoritesPage({ pieces }) {
  const artPiecesInfo = useStore((state) => state.artPiecesInfo);
  const favorites = pieces.filter((piece) =>
    artPiecesInfo.find(
      (artPiece) => artPiece.slug === piece.slug && artPiece.isFavorite
    )
  );

  return (
    <ArtPieces
      pieces={favorites}
    />
  );
}
