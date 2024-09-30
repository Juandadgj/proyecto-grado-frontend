"use client";
import { getAccessToken } from "@/services/auth.service";
import { saveGame } from "@/services/games.service";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AnimalBySize = ({ setWhatGame, whatGame, score }) => {
  const router = useRouter();
  const [responses, setResponses] = useState([]);
  const [user, setUser] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [scorePercentage, setScorePercentage] = useState(0);
  const [turns, setTurns] = useState(0);
  const [allCorrect, setAllCorrect] = useState(false)

  useEffect(() => {
    if (resultMessage) {
      // Abrir el modal cuando haya un resultado
      document.getElementById("my_modal_6").checked = true;
    }
  }, [resultMessage]);

  const handleCloseModal = () => {
    // Cerrar el modal
    document.getElementById("my_modal_6").checked = false;
    if (allCorrect) {
      setWhatGame('ANIMAL_BY_WORD')
    }else{
      router.push('/dashboard/games/levels/');
    }
  };

  const handleGameAgain = () => {
    // Reiniciar el juego
    document.getElementById("my_modal_6").checked = false;
    resetGame();
    setTurns(0);
    setWhatGame("ANIMAL_BY_SIZE");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (!token) {
        return;
      }
      const user = jwtDecode(token);
      setUser(user);
    };

    fetchData();
  }, []);

  const imgs = [
    { id: 1, img: "/abcGame/SAPO.jpg", word: "Sapo", size: "small" },
    { id: 2, img: "/abcGame/RANA.jpg", word: "Rana", size: "small" },
    { id: 3, img: "/abcGame/CABALLO.jpg", word: "Caballo", size: "big" },
    { id: 4, img: "/abcGame/RATÓN.jpg", word: "Ratón", size: "small" },
    { id: 5, img: "/abcGame/ELEFANTE.jpg", word: "Elefante", size: "big" },
  ];

  const correctAnswers = imgs.map((animal) => ({
    id: animal.id,
    size: animal.size,
  }));

  const getBorderColor = (animalId) => {
    const response = responses.find((res) => res.id === animalId);
    if (response) {
      return response.sizeType === "big" ? "border-blue-600" : "border-red-600";
    }
    return "border-gray-600"; // Borde por defecto
  };

  const handleBadgeClick = (animalId, sizeType) => {
    setTurns(turns + 1); // Incrementar el número de intentos

    setResponses((prevResponses) => {
      const existingResponse = prevResponses.find(
        (response) => response.id === animalId
      );

      if (existingResponse) {
        return prevResponses.map((response) =>
          response.id === animalId ? { ...response, sizeType } : response
        );
      } else {
        return [...prevResponses, { id: animalId, sizeType }];
      }
    });
  };

  const validateResponses = () => {
    if (responses.length !== imgs.length) {
      setResultMessage("⚠️ Responde todas las preguntas antes de validar ⚠️");
      return;
    }

    const allCorrect = responses.every((response) => {
      const correctAnswer = correctAnswers.find(
        (answer) => answer.id === response.id
      );
      setAllCorrect(true)
      return correctAnswer && correctAnswer.size === response.sizeType;
    });

    const score = responses.reduce((acc, response) => {
      const correctAnswer = correctAnswers.find(
        (answer) => answer.id === response.id
      );
      return correctAnswer && correctAnswer.size === response.sizeType
        ? acc + 1
        : acc;
    }, 0);

    // Calcular porcentaje de aciertos
    const percentage = (score / imgs.length) * 100;
    setScorePercentage(percentage);

    if (allCorrect) {
      setResultMessage("¡Todas las respuestas son correctas!");
    } else if (score > 0) {
      setResultMessage(
        `Obtuviste ${score} respuesta(s) correcta(s). Inténtalo de nuevo.`
      );
    } else {
      setResultMessage("Algunas respuestas son incorrectas. Inténtalo de nuevo.");
    }

    saveGame({
      type: "AnimalBySize",
      score,
      id: user?.id,
      userId: user?.userId,
    });
  };

  const resetGame = () => {
    setResponses([]);
    setResultMessage("");
  };

  return (
    <>
      <div>
        <h1 className="text-xl text-black text-center">
          Selecciona el color azul para los animales{" "}
          <span className="text-2xl font-bold">grandes</span> y rojo para los
          animales <span className="text-base font-bold">pequeños</span>
        </h1>
        <br />
        <div className="w-full flex items-center justify-center gap-5">
          {imgs.map((i) => (
            <div className="flex flex-col" key={i.id}>
              <div className="w-full flex justify-end gap-1 mb-1">
                <div
                  className="badge badge-primary badge-md cursor-pointer"
                  onClick={() => handleBadgeClick(i.id, "big")} // Azul para grande
                ></div>
                <div
                  className="badge badge-error badge-md cursor-pointer"
                  onClick={() => handleBadgeClick(i.id, "small")} // Rojo para pequeño
                ></div>
              </div>
              <div className="flex flex-col">
                <div
                  className={`border-4 rounded ${getBorderColor(i.id)}`} // Cambia el borde según la respuesta
                >
                  <img src={i.img} alt="card" className="h-36 w-36" />
                </div>
                <span className="text-center text-black">{i.word}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-end fixed bottom-20 left-44 right-auto w-full">
          <div className="mt-4 w-full flex justify-center items-end gap-4">
            <button className="btn btn-info" onClick={resetGame}>
              Reiniciar juego <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

            </button>
            <button
              className="btn btn-success"
              onClick={validateResponses}
            >
              Validar respuestas <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

            </button>
          </div>
        </div>
      </div>

      
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="text-xl font-medium text-center text-gray-900">
            {resultMessage}
          </h3>
          <p className="py-4 text-center text-gray-900">
          </p>

          {/* Información de intentos y puntuación */}
          <div className="text-center space-y-4">
            <p className="text-xl font-semibold text-gray-900">
              Intentos realizados: <span className="text-blue-500">{turns}</span>
            </p>
            <p className="text-xl font-semibold text-gray-900">
              Puntuación:
              <span
                className={`text-2xl font-bold ${scorePercentage >= 80
                    ? "text-green-500"
                    : scorePercentage >= 50
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
              >
                {"  " + scorePercentage}%
              </span>
            </p>
          </div>

          {/* Mensaje motivacional */}
          <p className="text-center mt-4 text-gray-900">
            {scorePercentage >= 80
              ? "¡Excelente trabajo!"
              : scorePercentage >= 50
                ? "¡Bien hecho! Pero puedes mejorar."
                : "Sigue intentándolo, lo harás mejor la próxima vez."}
          </p>
          <div className="modal-action justify-between">
            <button
              className="btn bg-gray-600 text-white border-black border-2"
              onClick={handleGameAgain}
            >
              Repasar Juego <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>

            </button>
            <button
              className="btn bg-green-500 text-white border-green-900 border-2 hover:bg-green-950"
              onClick={handleCloseModal}
            >
              {
                allCorrect ? <> Siguiente Juego <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
              </> : <>Ver otros niveles <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                  </svg></>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalBySize;
