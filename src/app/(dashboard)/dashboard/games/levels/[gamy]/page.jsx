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

  return (
    <div
      className="px-20 py-10 w-full h-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9]"
      style={{ scrollbarColor: "#000f transparent" }}
    >
      {params.gamy === "01" ? (
        whatGame === "MEMORY" ? (
          <AbcGame
            setWhatGame={setWhatGame}
            score={ratings.find((r) => r.type == "AbcGame")?.score}
          />
        ) : whatGame === "ANIMAL_BY_SIZE" ? (
          <AnimalBySize setWhatGame={setWhatGame} />
        ) : (
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
  );
};

export default page;
