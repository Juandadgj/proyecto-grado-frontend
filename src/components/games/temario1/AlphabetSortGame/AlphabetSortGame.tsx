'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import GameCompleteModal from '@/components/GameCompleteModal'

const initialWords = ['Sol', 'Árbol', 'Casa', 'Elefante', 'Banco']

function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    cursor: 'grab',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  )
}

interface Props {
  onNextGame: () => void
  onGoHome: () => void
}

export default function AlphabetSortGame({ onNextGame, onGoHome }: Props) {
  const [words, setWords] = useState(shuffleArray(initialWords))
  const [result, setResult] = useState<boolean | null>(null)

  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
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
      const modal = document.getElementById('game_complete_modal') as HTMLDialogElement
      modal?.showModal()
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 text-center space-y-4">
      <h2 className="text-xl font-bold">Ordena las palabras alfabéticamente</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={words} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col space-y-2">
            {words.map((word) => (
              <SortableItem key={word} id={word} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {result !== null && (
        <p className={`font-semibold ${result ? 'text-green-600' : 'text-red-600'}`}>
          {result ? '¡Correcto!' : 'Aún no están en orden alfabético'}
        </p>
      )}

      <div className="space-x-2">
        <button
          onClick={validate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Validar
        </button>
        <button
          onClick={() => {
            setWords(shuffleArray(initialWords))
            setResult(null)
          }}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Reiniciar
        </button>
      </div>

      <GameCompleteModal onNextGame={onNextGame} onGoHome={onGoHome} />
    </div>
  )
}
