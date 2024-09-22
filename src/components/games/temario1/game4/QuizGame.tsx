import { getAccessToken } from "@/services/auth.service";
import { saveGame } from "@/services/games.service";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

type Option = {
  id: string;
  text: string;
};

type Question = {
  question: string;
  options: Option[];
  correctAnswer: string;
};

const QuizGames: React.FC = () => {
  const questions: Question[] = [
    {
      question: "¿CON QUIÉN IBA EL SAPO?",
      options: [
        { id: "A", text: "Con el caballo" },
        { id: "B", text: "Con el ratón" },
        { id: "C", text: "Con la rana" },
      ],
      correctAnswer: "C",
    },
    {
      question: "El sombrero que llevaba la rana era",
      options: [
        { id: "A", text: "Pequeño" },
        { id: "B", text: "Grande" },
      ],
      correctAnswer: "B",
    },
    {
      question: "El balón que llevó el elefante era",
      options: [
        { id: "A", text: "Grande" },
        { id: "B", text: "Pequeño" },
      ],
      correctAnswer: "A",
    },
    {
      question: "La oveja tenía una pelota pequeña para",
      options: [
        { id: "A", text: "Jugar con su papá" },
        { id: "B", text: "Jugar con sus amigas" },
        { id: "C", text: "Jugar con su mamá" },
      ],
      correctAnswer: "C",
    },
    {
      question: "LA NOVIA DEL SAPO ES",
      options: [
        { id: "A", text: "La jirafa" },
        { id: "B", text: "La oveja" },
        { id: "C", text: "La rana" },
      ],
      correctAnswer: "C",
    },
    {
      question: "LA ESPOSA DEL LEÓN ES",
      options: [
        { id: "A", text: "La ratona" },
        { id: "B", text: "La leona" },
        { id: "C", text: "La gata" },
      ],
      correctAnswer: "B",
    },
    {
      question: "LOS MEJORES AMIGOS DEL SAPO SON",
      options: [
        { id: "A", text: "El gato y el caballo" },
        { id: "B", text: "El elefante y el ratón" },
        { id: "C", text: "El león y la leona" },
      ],
      correctAnswer: "B",
    },
  ];

  const [responses, setResponses] = useState<Record<number, string>>({});
  const [resultMessage, setResultMessage] = useState<string>("");
  const [user, setUser] = useState<any>(null);

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
  const handleOptionChange = (
    questionIndex: number,
    selectedOption: string
  ) => {
    setResponses({
      ...responses,
      [questionIndex]: selectedOption,
    });
  };

  const validateQuiz = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (responses[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    if (correctCount === questions.length) {
      setResultMessage("¡Todas las respuestas son correctas!");
    } else {
      setResultMessage(
        `Has acertado ${correctCount} de ${questions.length} preguntas. Inténtalo de nuevo.`
      );
    }

    saveGame({
      userId: user.id,
      id: user.id,
      score: correctCount,
      type: "quiz",
    });
  };

  const resetQuiz = () => {
    setResponses({});
    setResultMessage("");
  };

  return (
    <div className="quiz-container text-black h-full">
      <h1 className="text-2xl font-bold mb-4">Cuestionario</h1>
      <div className="grid grid-cols-2">
        {questions.map((q, index) => (
          <div key={index} className="question-block mb-4">
            <p className="text-lg font-semibold">{q.question}</p>
            <div className="options">
              {q.options.map((option) => (
                <label key={option.id} className="flex gap-2 py-1">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.id}
                    checked={responses[index] === option.id}
                    onChange={() => handleOptionChange(index, option.id)}
                    className="radio h-5 w-5 radio-info"
                  />
                  <p>{option.text}</p>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <button className="btn btn-info mt-4 ml-4" onClick={resetQuiz}>
          Reiniciar Cuestionario
        </button>
        <button className="btn btn-success mt-4" onClick={validateQuiz}>
          Validar Respuestas
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

export default QuizGames;
