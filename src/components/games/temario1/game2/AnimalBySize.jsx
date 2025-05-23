"use client";
import { Rating } from "@/components/ui/rating";
import { getAccessToken } from "@/services/auth.service";
import { saveGame } from "@/services/games.service";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const WordsGame = ({ setWhatGame, whatGame, onComplete, onNextGame }) => {
  const router = useRouter();
  const [responses, setResponses] = useState([]);
  const [user, setUser] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [turns, setTurns] = useState(0);
  const [allCorrect, setAllCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (resultMessage) {
      document.getElementById("my_modal_6").checked = true;
    }
  }, [resultMessage]);

  const handleCloseModal = () => {
    if (allCorrect) {
      document.getElementById("my_modal_6").checked = false;
      onNextGame();
    } else {
      document.getElementById("my_modal_6").checked = false;
      router.push("/dashboard/games/");
    }
  };

  const handleGameAgain = () => {
    document.getElementById("my_modal_6").checked = false;
    resetGame();
    setTurns(0);
    setWhatGame("WORDS_VALIDATION");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (!token) return;
      const user = jwtDecode(token);
      setUser(user);
    };

    fetchData();
  }, []);

  const words = [
    { id: 1, word: "Elefante", img: "/abcGame/ELEFANTE.jpg", isCorrect: true },
    { id: 2, word: "Plátana", img: "/abcGame/BANANA.jpg", isCorrect: false }, // incorrecta
    { id: 3, word: "Caballo", img: "/abcGame/CABALLO.jpg", isCorrect: true },
    { id: 4, word: "Sapito", img: "/abcGame/SAPO.jpg", isCorrect: false }, // incorrecta
    { id: 5, word: "Ratón", img: "/abcGame/RATÓN.jpg", isCorrect: true },
    { id: 6, word: "Lapis", img: "/abcGame/lapiz.jpg", isCorrect: false },
    { id: 7, word: "Girrafa", img: "/abcGame/JIRAFA.jpg", isCorrect: false },
    { id: 8, word: "Oveja", img: "/abcGame/OVEJA.jpg", isCorrect: true },
  ];

  const correctAnswersList = [
    { id: 1, isCorrect: true },
    { id: 2, isCorrect: false },
    { id: 3, isCorrect: true },
    { id: 4, isCorrect: false },
    { id: 5, isCorrect: true },
    { id: 6, isCorrect: false },
    { id: 7, isCorrect: false },
    { id: 8, isCorrect: true },
  ];

  const getBorderColor = (id) => {
    const response = responses.find((res) => res.id === id);
    if (response) {
      return response.choice === "correct"
        ? "border-green-600"
        : "border-red-600";
    }
    return "border-gray-600";
  };

  const handleBadgeClick = (id, choice) => {
    setTurns((prev) => prev + 1);
    setResponses((prev) => {
      const existing = prev.find((res) => res.id === id);
      if (existing) {
        return prev.map((res) => (res.id === id ? { ...res, choice } : res));
      } else {
        return [...prev, { id, choice }];
      }
    });
  };

  const validateResponses = () => {
    if (responses.length !== words.length) {
      setResultMessage("⚠️ Responde todas las preguntas antes de validar ⚠️");
      return;
    }

    const allCorrect = responses.every((res) => {
      const answer = correctAnswersList.find((ans) => ans.id === res.id);
      return answer && answer.isCorrect === (res.choice === "correct");
    });

    const correctCount = responses.reduce((acc, res) => {
      const answer = correctAnswersList.find((ans) => ans.id === res.id);
      return answer && answer.isCorrect === (res.choice === "correct")
        ? acc + 1
        : acc;
    }, 0);

    setAllCorrect(allCorrect);

    if (!gameCompleted) {
      setGameCompleted(true);
      onComplete(correctCount, turns);
    }

    if (allCorrect) {
      setResultMessage("¡Todas las respuestas son correctas!");
    } else if (correctCount > 0) {
      setResultMessage(
        `Obtuviste ${correctCount} respuesta(s) correcta(s). Inténtalo de nuevo.`
      );
    } else {
      setResultMessage(
        "Algunas respuestas son incorrectas. Inténtalo de nuevo."
      );
    }
  };

  const resetGame = () => {
    setResponses([]);
    setResultMessage("");
    setGameCompleted(false);
    setTurns(0);
    setAllCorrect(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full my-10 mx-6">
        <h1 className="text-xl text-black text-center">
          Selecciona el color{" "}
          <span className="text-[#00A96E] font-semibold">verde</span> para las
          palabras correctas y{" "}
          <span className="text-[#FF5861] font-semibold">rojo</span> para las
          incorrectas
        </h1>
        <div className="flex justify-center items-center mt-4">
          <p className="text-black font-semibold">Intentos: {turns}</p>
        </div>
        <br />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-4">
          {words.map((w) => (
            <div className="flex flex-col" key={w.id}>
              <div className="w-full flex justify-center gap-1 mb-1">
                <div
                  className="badge badge-success badge-md cursor-pointer"
                  onClick={() => handleBadgeClick(w.id, "correct")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div
                  className="badge badge-error badge-md cursor-pointer"
                  onClick={() => handleBadgeClick(w.id, "incorrect")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`border-[5px] rounded ${getBorderColor(w.id)}`}>
                  <img src={w.img} alt={w.word} className="h-28 w-2h-28" />
                </div>
                <span className="text-center text-black font-normal text-xl">
                  {w.word}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-end fixed bottom-20 left-44 right-auto w-full">
          <div className="mt-4 w-full flex justify-center items-end gap-4">
            <button className="btn btn-info" onClick={resetGame}>
              Reiniciar juego
            </button>
            <button className="btn btn-success" onClick={validateResponses}>
              Validar respuestas
            </button>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          {resultMessage && (
            <div className="text-center mt-4 text-red-600 font-semibold">
              {resultMessage}
            </div>
          )}

          <div className="text-center space-y-4">
            <p className="text-xl font-semibold text-gray-900">
              Intentos realizados:{" "}
              <span className="text-blue-500">{turns}</span>
            </p>
          </div>

          <p className="text-center mt-4 text-gray-900">
            {turns <= 20
              ? "¡Excelente trabajo!"
              : turns <= 40
              ? "¡Bien hecho! Pero puedes mejorar."
              : "Sigue intentándolo, lo harás mejor la próxima vez."}
          </p>
          <div className="modal-action justify-center">
            <button
              className="btn bg-green-500 text-white border-green-900 border-2 hover:bg-green-950"
              onClick={handleCloseModal}
            >
              {allCorrect ? "Siguiente Juego" : "Ver otros niveles"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordsGame;
