"use client";
import React, { useEffect, useState } from "react";
import AbcGame from "../../../../../../components/games/temario1/game1/AbcGame";
import AnimalBySize from "../../../../../../components/games/temario1/game2/AnimalBySize";
import AnimalByColor from "../../../../../../components/games/temario1/game3/AnimalByColor";
import QuizGames from "@/components/games/temario1/game4/QuizGame";
import AnimalQuizGame from "@/components/games/temario1/game5/AnimalQuizGame";
import { getAccessToken } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { getRatings } from "@/lib/ratings/actions";
import WordSearchGame from "@/components/games/temario1/game6/WordSearchGame";
import DragAndDrop from "@/components/games/temario1/game7/DragAndFrop";

const page = ({ params }) => {
  const [whatGame, setWhatGame] = useState("MEMORY");
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (params.gamy === "02") {
      setWhatGame('SOPA_LETRAS');
    }
  }, [params.gamy, setWhatGame]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (!token) {
        return;
      }
      const user = jwtDecode(token);
      const ratings = await getRatings(user.email);
      console.log(ratings);
      setRatings(ratings.ratings);
    };
    fetchData();
  }, []);

  const getGameTitle = (game) => {
    switch (game) {
      case "MEMORY":
        return "Juego de memoria".toUpperCase();
      case "ANIMAL_BY_SIZE":
        return "Ordena por tamaño".toUpperCase();
      case "ANIMAL_BY_WORD":
        return "Ordena por palabra".toUpperCase();
      case "SOPA_LETRAS":
        return "Sopa de letras".toUpperCase();
    }
  };

  return (
    <div
      className="px-20 py-10 w-full h-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9]"
      // style={{ scrollbarColor: "#000f transparent" }}
    >
      <div className="bg-white w-full h-full shadow-2xl rounded-3xl p-10 overflow-auto">
        <div className="flex top-4 left-4 items-center pb-10">
          <button onClick={() => window.history.back()} style={{ backgroundColor: '#E5F6F7', borderColor: 'transparent' }} className={`btn bg-blue`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold bg-clip-text ml-4 text-gray-700">
            {getGameTitle(whatGame)}
          </h2>
        </div>
        {params.gamy === "01" ? (
          whatGame === "MEMORY" ? (
            <AbcGame
              setWhatGame={setWhatGame}
              score={ratings.find((r) => r.type == "AbcGame")?.score}
            />
          ) : whatGame === "ANIMAL_BY_SIZE" ? (
            <AnimalBySize setWhatGame={setWhatGame} />
          ) : whatGame === "ANIMAL_BY_WORD" && (
            <DragAndDrop /> //<AnimalByColor setWhatGame={setWhatGame} />
          )
        ) : params.gamy === "02" ? (
          whatGame === "SOPA_LETRAS" && (
            <WordSearchGame setWhatGame={setWhatGame} />
          )
        ) : params.gamy === "03" ? (
          <QuizGames score={ratings.find((r) => r.type == "quiz")?.score} />
        ) : null}
      </div>
    </div>
  );
};

export default page;
