import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      artPiecesInfo: [],

      toggleFavorite: (slug) =>
        set((state) => {
          const artPiece = state.artPiecesInfo.find(
            (piece) => piece.slug === slug
          );
          if (artPiece) {
            return {
              artPiecesInfo: state.artPiecesInfo.map((pieceInfo) =>
                pieceInfo.slug === slug
                  ? { ...pieceInfo, isFavorite: !pieceInfo.isFavorite }
                  : pieceInfo
              ),
            };
          } else {
            return {
              artPiecesInfo: [
                ...state.artPiecesInfo,
                { slug, isFavorite: true },
              ],
            };
          }
        }),
      addComment: (slug, newComment) =>
        set((state) => {
          const artPiece = state.artPiecesInfo.find(
            (piece) => piece.slug === slug
          );
          if (artPiece) {
            return {
              artPiecesInfo: state.artPiecesInfo.map((pieceInfo) => {
                if (pieceInfo.slug === slug) {
                  return pieceInfo.comments
                    ? {
                        ...pieceInfo,
                        comments: [...pieceInfo.comments, newComment],
                      }
                    : { ...pieceInfo, comments: [newComment] };
                } else {
                  return pieceInfo;
                }
              }),
            };
          } else {
            return {
              artPiecesInfo: [
                ...state.artPiecesInfo,
                { slug, isFavorite: false, comments: [newComment] },
              ],
            };
          }
        }),
    }),
    { name: `artPiecesInfo` }
  )
);

export default useStore;
