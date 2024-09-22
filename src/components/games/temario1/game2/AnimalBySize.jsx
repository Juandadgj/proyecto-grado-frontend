"use client";
import { getAccessToken } from "@/services/auth.service";
import { saveGame } from "@/services/games.service";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const AnimalBySize = ({ setWhatGame, whatGame }) => {
  const [responses, setResponses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      if (!token) {
        return
      }
      const user = jwtDecode(token)
      setUser(user)
    }

    fetchData()
  }, [])
  const imgs = [
    { id: 1, img: "/abcGame/SAPO.jpg", word: "Sapo", size: "small" },
    { id: 2, img: "/abcGame/RANA.jpg", word: "Rana", size: "small" },
    { id: 3, img: "/abcGame/CABALLO.jpg", word: "Caballo", size: "big" },
    { id: 4, img: "/abcGame/RATÓN.jpg", word: "Ratón", size: "small" },
    { id: 5, img: "/abcGame/ELEFANTE.jpg", word: "Elefante", size: "big" },
  ];
  const [resultMessage, setResultMessage] = useState("");

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
    // Actualizar el borde de la imagen según la selección
    setResponses((prevResponses) => {
      const existingResponse = prevResponses.find(
        (response) => response.id === animalId
      );

      if (existingResponse) {
        // Actualizamos la respuesta si ya existe
        return prevResponses.map((response) =>
          response.id === animalId ? { ...response, sizeType } : response
        );
      } else {
        // Añadimos una nueva respuesta si no existe
        return [...prevResponses, { id: animalId, sizeType }];
      }
    });
  };
  const validateResponses = () => {
    if (responses.length !== imgs.length) {
      setResultMessage("Responde todas las preguntas antes de validar.");
      return;
    }

    // Comparar cada respuesta del jugador con la respuesta correcta
    const allCorrect = responses.every((response) => {
      const correctAnswer = correctAnswers.find(
        (answer) => answer.id === response.id
      );
      return correctAnswer && correctAnswer.size === response.sizeType;
    });

    // PUNTAJE OBTENIDO
    const score = responses.reduce((acc, response) => {
      const correctAnswer = correctAnswers.find(
        (answer) => answer.id === response.id
      );
      return correctAnswer && correctAnswer.size === response.sizeType
        ? acc + 1
        : acc;
    }, 0);

    if (allCorrect) {
      setResultMessage("¡Todas las respuestas son correctas!");
    } else if (score > 0) {
      setResultMessage(
        `Obtuviste ${score} respuesta(s) correcta(s). Inténtalo de nuevo.`
      );
    } else {
      setResultMessage(
        "Algunas respuestas son incorrectas. Inténtalo de nuevo."
      );
    }
    saveGame({
      type: "AnimalBySize",
      score,
      id: user.id,
      userId: user.userId,
    });
  };

  const resetGame = () => {
    setResponses([]); // Reiniciar las respuestas del jugador
    setResultMessage(""); // Limpiar el mensaje de validación
  };

  return (
    <div>
      <h1 className="text-xl text-black text-center">
        Selecciona el color azul para los animales grandes y rojo para los
        animales pequeños
      </h1>
      <br />
      <div className="w-full flex items-center justify-center gap-5">
        {imgs.map((i) => (
          <div className="flex flex-col">
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
      <br />
      <div className="mt-4 w-full flex justify-center gap-4">
        <button
          className="btn btn-success"
          onClick={validateResponses} // Validamos respuestas al hacer clic
        >
          Validar respuestas
        </button>
        <button className="btn btn-info" onClick={resetGame}>
          Reiniciar juego
        </button>
      </div>
      {resultMessage && (
        <div className="mt-4">
          <p className="text-center text-lg font-bold text-black">
            {resultMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimalBySize;
