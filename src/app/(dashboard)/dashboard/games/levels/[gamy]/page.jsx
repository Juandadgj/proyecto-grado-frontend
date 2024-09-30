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

const page = ({ params }) => {
  const [whatGame, setWhatGame] = useState("MEMORY");
  const [ratings, setRatings] = useState([]);
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
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
            <AnimalByColor setWhatGame={setWhatGame} />
          )
        ) : params.gamy === "02" ? (
          <>
            <AnimalBySize
              score={ratings.find((r) => r.type == "AnimalBySize")?.score}
            />
            <br />
            <AnimalQuizGame
              score={ratings.find((r) => r.type == "AnimalQuiz")?.score}
            />
          </>
        ) : params.gamy === "03" ? (
          <QuizGames score={ratings.find((r) => r.type == "quiz")?.score} />
        ) : null}
      </div>
    </div>
  );
};

export default page;
