import { getAccessToken } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";

type Board = string[][];
type Position = { row: number; col: number };
type Word = {
  word: string;
  positions: Position[];
};

const wordsList: string[] = ["ELEFANTE", "CABALLO", "RATON", "RANA", "SAPO"];
const boardSize = 10;

const generateEmptyBoard = (): Board => {
  return Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(""));
};

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const placeWordOnBoard = (board: Board, word: string): Word | null => {
  let placed = false;
  const maxAttempts = 100; // Intentos máximos para colocar una palabra
  let attempts = 0;
  let wordPositions: Position[] = [];

  while (!placed && attempts < maxAttempts) {
    const startRow = getRandomInt(boardSize);
    const startCol = getRandomInt(boardSize);
    const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

    wordPositions = [];

    if (direction === "horizontal" && startCol + word.length <= boardSize) {
      // Verificar si cabe horizontalmente
      for (let i = 0; i < word.length; i++) {
        if (board[startRow][startCol + i] !== "" && board[startRow][startCol + i] !== word[i]) {
          break;
        }
        wordPositions.push({ row: startRow, col: startCol + i });
      }

      if (wordPositions.length === word.length) {
        word.split("").forEach((char, index) => {
          board[startRow][startCol + index] = char;
        });
        placed = true;
      }
    } else if (direction === "vertical" && startRow + word.length <= boardSize) {
      // Verificar si cabe verticalmente
      for (let i = 0; i < word.length; i++) {
        if (board[startRow + i][startCol] !== "" && board[startRow + i][startCol] !== word[i]) {
          break;
        }
        wordPositions.push({ row: startRow + i, col: startCol });
      }

      if (wordPositions.length === word.length) {
        word.split("").forEach((char, index) => {
          board[startRow + index][startCol] = char;
        });
        placed = true;
      }
    }

    attempts++;
  }

  return placed ? { word, positions: wordPositions } : null;
};

const fillBoardWithRandomLetters = (board: Board) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === "") {
        board[row][col] = alphabet[getRandomInt(alphabet.length)];
      }
    }
  }
};

const WordSearchGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(generateEmptyBoard());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [wordsOnBoard, setWordsOnBoard] = useState<Word[]>([]);
  // Generar la sopa de letras
  useEffect(() => {
    const newBoard = generateEmptyBoard();
    const placedWords: Word[] = [];

    wordsList.forEach((word) => {
      const placedWord = placeWordOnBoard(newBoard, word);
      if (placedWord) {
        placedWords.push(placedWord);
      }
    });

    fillBoardWithRandomLetters(newBoard);
    setBoard(newBoard);
    setWordsOnBoard(placedWords);
  }, []);

  // Seleccionar una letra en la sopa de letras
  const handleSelectLetter = (position: Position) => {
    setSelectedPositions((prev) => [...prev, position]);
  };

  // Validar si se encontró alguna palabra
  const checkForWord = () => {
    const selectedWord = selectedPositions
      .map(({ row, col }) => board[row][col])
      .join("");

    const wordFound = wordsOnBoard.find((wordObj) =>
      wordObj.word === selectedWord &&
      wordObj.positions.every(
        (pos, index) =>
          pos.row === selectedPositions[index].row &&
          pos.col === selectedPositions[index].col
      )
    );

    if (wordFound) {
      setFoundWords((prev) => [...prev, wordFound.word]);
      setSelectedPositions([]);
    } else {
      alert("¡Sigue intentando!");
      setSelectedPositions([]);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setBoard(generateEmptyBoard());
    setFoundWords([]);
    setSelectedPositions([]);
  };

  return (
    <div className="word-search-game">
      <h1 className="text-2xl font-bold mb-4">Sopa de Letras - Animales</h1>
      <div className="grid grid-cols-10 gap-1 mb-4">
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleSelectLetter({ row: rowIndex, col: colIndex })}
              className={`border w-10 h-10 flex items-center justify-center cursor-pointer ${
                selectedPositions.some((pos) => pos.row === rowIndex && pos.col === colIndex)
                  ? "bg-blue-200"
                  : ""
              }`}
            >
              {letter}
            </div>
          ))
        )}
      </div>

      <button className="btn btn-primary mb-4" onClick={checkForWord}>
        Validar Palabra
      </button>
      <button className="btn btn-secondary mb-4 ml-2" onClick={resetGame}>
        Reiniciar Juego
      </button>

      <div>
        <h2 className="text-xl font-bold">Palabras encontradas:</h2>
        <ul>
          {foundWords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordSearchGame;
