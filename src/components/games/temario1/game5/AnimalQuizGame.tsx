import { getAccessToken } from "@/services/auth.service";
import { saveGame } from "@/services/games.service";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

type Animal = {
  id: number;
  name: string;
  imgSrc: string;
};

const AnimalQuizGame: React.FC = () => {
  // Lista de animales con sus imágenes y nombres correctos
  const animals: Animal[] = [
    { id: 1, name: "Elefante", imgSrc: "/abcGame/ELEFANTE.jpg" },
    { id: 2, name: "Rana", imgSrc: "/abcGame/RANA.jpg" },
    { id: 3, name: "Caballo", imgSrc: "/abcGame/CABALLO.jpg" },
    { id: 4, name: "Raton", imgSrc: "/abcGame/RATÓN.jpg" },
    { id: 5, name: "Sapo", imgSrc: "/abcGame/SAPO.jpg" },
  ];

  // Estado para las respuestas ingresadas por el usuario
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [resultMessage, setResultMessage] = useState<string>("");
  const [user, setUser] = useState<any>(null);

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
  // Función que maneja el cambio de input en cada imagen
  const handleInputChange = (animalId: number, value: string) => {
    setResponses({
      ...responses,
      [animalId]: value,
    });
  };

  // Función para validar las respuestas
  const validateQuiz = () => {
    let correctCount = 0;

    animals.forEach((animal) => {
      if (responses[animal.id]?.toLowerCase() === animal.name.toLowerCase()) {
        correctCount++;
      }
    });

    if (correctCount === animals.length) {
      setResultMessage("¡Todas las respuestas son correctas!");
    } else {
      setResultMessage(
        `Has acertado ${correctCount} de ${animals.length} animales. ¡Inténtalo de nuevo!`
      );
    }

    saveGame({
      userId: user.id,
      id: user.id,
      score: correctCount,
      type: "AnimalQuiz",
    });
  };

  // Función para reiniciar el juego
  const resetQuiz = () => {
    setResponses({});
    setResultMessage("");
  };

  return (
    <div className="quiz-container text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">
        ¿Qué animal es este?
      </h1>
      <div className="w-full flex flex-col justify-center items-center">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-block mb-4 flex items-center">
            <img
              src={animal.imgSrc}
              alt={animal.name}
              className="animal-img h-36 w-36 mr-4 border-2 border-gray-300"
            />
            <input
              type="text"
              placeholder="Escribe el nombre del animal"
              value={responses[animal.id] || ""}
              onChange={(e) => handleInputChange(animal.id, e.target.value)}
              className="mt-1 p-2 w-full border border-[#00cef8] rounded-md focus:border-[#00cef8]  focus:outline-none transition-colors duration-300 bg-white text-black"
            />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <button className="btn btn-success mt-4" onClick={validateQuiz}>
          Validar Respuestas
        </button>
        <button className="btn btn-secondary mt-4 ml-4" onClick={resetQuiz}>
          Reiniciar Quiz
        </button>
      </div>

      {resultMessage && (
        <div className="result-message mt-4">
          <p className="text-center text-lg font-bold text-black">
            {resultMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimalQuizGame;
