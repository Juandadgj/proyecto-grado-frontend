"use client";
import React, { useEffect, useState } from "react";
import AbcGame from "../../../../../../components/games/temario1/game1/AbcGame";
import AnimalBySize from "../../../../../../components/games/temario1/game2/AnimalBySize";
import AnimalByColor from "../../../../../../components/games/temario1/game3/AnimalByColor";
import QuizGames from "@/components/games/temario1/game4/QuizGame";
import AnimalQuizGame from "@/components/games/temario1/game5/AnimalQuizGame";

const page = async ({ params }) => {
  const [whatGame, setWhatGame] = useState("MEMORY");
  return (
    <div
      className="px-20 py-10 w-full h-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9]"
      style={{ scrollbarColor: "#000f transparent" }}
    >
      {params.gamy === "01" ? (
        whatGame === "MEMORY" ? (
          <AbcGame setWhatGame={setWhatGame} />
        ) : whatGame === "ANIMAL_BY_SIZE" ? (
          <AnimalBySize setWhatGame={setWhatGame} />
        ) : (
          <AnimalByColor setWhatGame={setWhatGame} />
        )
      ) : params.gamy === "02" ? (
        <>
          <AnimalBySize />
          <br />
          <AnimalQuizGame />
        </>
      ) : params.gamy === "03" ? (
        <QuizGames />
      ) : null}
    </div>
  );
};

export default page;
