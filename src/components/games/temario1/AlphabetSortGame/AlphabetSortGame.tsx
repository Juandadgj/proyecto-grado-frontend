"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GameCompleteModal from "@/components/GameCompleteModal";
import { saveGame } from "@/services/games.service";
import { getAccessToken } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { Rating } from "@/components/ui/rating";
import { getRatings } from "@/lib/ratings/actions";

const initialWords = ['Sol', 'Árbol', 'Casa', 'Elefante', 'Banco']
const images = [{id: 'Sol', image: '/abcGame/sol.png'}, {id: 'Árbol', image: '/abcGame/arbol.png'}, {id: 'Casa', image: '/abcGame/casa.png'}, {id: 'Elefante', image: '/abcGame/elefante.jpg'}, {id: 'Banco', image: '/abcGame/banco.png'}]

function SortableItem({ id, image }: { id: string, image?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? "transform 150ms ease" : undefined,
  };

  return ( 
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full flex justify-center items-center bg-white shadow-lg text-xl font-bold text-center py-6 rounded-2xl border border-gray-300 cursor-grab active:cursor-grabbing transition-transform"
    >
      {/* {image} */}
      <div className="flex justify-center items-center gap-2">
        <img src={image} alt="abc" className="w-14 h-14" />
        {id}
      </div>
    </div>
  );
}

interface Props {
  onNextGame: () => void;
  onGoHome: () => void;
  onComplete: (attempts: number) => void;
}

export default function AlphabetSortGame({ onNextGame, onGoHome, onComplete }: Props) {
  const [user, setUser] = useState<any>(null);
  const [words, setWords] = useState(shuffleArray(initialWords));
  const [result, setResult] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const userDecode = jwtDecode(token);
        setUser(userDecode);
        const ratings = await getRatings(user?.id);
        const rating = ratings.find((rating: any) => rating.game === "AbcGame");
        setRating(rating?.score);
      }
    };
    fetchData();
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAttempts(prev => prev + 1);
      const oldIndex = words.indexOf(active.id as string)
      const newIndex = words.indexOf(over.id as string)
      setWords(arrayMove(words, oldIndex, newIndex))
    }
  }

  function shuffleArray(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5)
  }

  function validate() {
    const correct = [...words].every(
      (word, i, arr) =>
        i === 0 || arr[i - 1].localeCompare(word, 'es', { sensitivity: 'base' }) <= 0
    )
    setResult(correct)

    if (correct) {
      onComplete(attempts);
    }
  }
 
  return (
    <div className="min-h-full px-4 py-6 flex flex-col gap-6">
      <h2 className="text-3xl font-extrabold text-center text-blue-500">
        Ordena las palabras alfabéticamente
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={words} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4">
            {words.map((word, i) => (
              <SortableItem key={word} id={word} image={images.find((image: any) => image.id === word)?.image} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {result !== null && (
        <p
          className={`font-bold text-center text-2xl ${
            result ? "text-green-600" : "text-red-600"
          }`}
        >
          {result ? "¡Correcto!" : "Aún no están en orden alfabético"}
        </p>
      )}

      <div className="flex justify-center gap-4 flex-wrap mt-4">
        <button
          onClick={validate}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          Validar
        </button>
        <button
          onClick={() => {
            setRating(0);
            setWords(shuffleArray(initialWords));
            setResult(null);
          }}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          Reiniciar
        </button>
      </div>
      <GameCompleteModal
        onNextGame={onNextGame}
        onGoHome={onGoHome}
        rating={rating}
        showNextButton={result === true}
      />
    </div>
  );
}
