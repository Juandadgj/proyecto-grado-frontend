import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface SyllableGameProps {
  word: string;
  imageSrc: any;
  onSolved?: (correct: boolean) => void;
}

const syllablesDictionary: Record<string, string[]> = {
  gato: ['ga', 'to'],
  perro: ['pe', 'rro'],
  casa: ['ca', 'sa'],
  rana: ['ra', 'na'],
  pelota: ['pe', 'lo', 'ta'],
  zapato: ['za', 'pa', 'to'],
  avión: ['a', 'vión'],
  mochila: ['mo', 'chi', 'la'],
  camión: ['ca', 'mión'],
  helado: ['he', 'la', 'do'],
  ventana: ['ven', 'ta', 'na'],
  juguetes: ['ju', 'gue', 'tes'],
  cuaderno: ['cua', 'der', 'no'],
  silla: ['si', 'lla'],
  lápiz: ['lá', 'piz'],
  botella: ['bo', 'te', 'lla'],
  pijama: ['pi', 'ja', 'ma'],
  sombrero: ['som', 'bre', 'ro'],
  lámpara: ['lám', 'pa', 'ra'],
  cuchara: ['cu', 'cha', 'ra'],
  cereales: ['ce', 're', 'a', 'les'],
  carpeta: ['car', 'pe', 'ta'],
  estuche: ['es', 'tu', 'che'],
  tijeras: ['ti', 'je', 'ras']
};

const splitWordIntoSyllables = (word: string): string[] => {
  return syllablesDictionary[word.toLowerCase()] || [];
};

export const SyllableGame: React.FC<SyllableGameProps> = ({ word, imageSrc, onSolved }) => {
  const correctSyllables = useMemo(() => splitWordIntoSyllables(word.toLowerCase()), [word]);
  const [placedSyllables, setPlacedSyllables] = useState<(string | null)[]>([]);
  const [remainingSyllables, setRemainingSyllables] = useState<string[]>([]);
  const [lastAttempt, setLastAttempt] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    setPlacedSyllables(Array(correctSyllables.length).fill(null));
    setRemainingSyllables([...correctSyllables].sort(() => Math.random() - 0.5));
    setLastAttempt(null);
    setIsComplete(false);
    setHasNotified(false);
  }, [word]);

  const validateAttempt = (syllable: string, index: number) => {
    const isCorrect = syllable === correctSyllables[index];
    if (!isCorrect && syllable !== lastAttempt && !isComplete) {
      setLastAttempt(syllable);
      onSolved?.(false); // Notificar intento incorrecto
    }
    return isCorrect;
  };

  const checkWordCompletion = (newPlaced: (string | null)[]) => {
    if (newPlaced.every(s => s !== null)) {
      const wordCorrect = newPlaced.join('') === word.toLowerCase();
      if (wordCorrect && !hasNotified) {
        setIsComplete(true);
        setHasNotified(true);
        onSolved?.(true);
      } else if (!wordCorrect && !isComplete) {
        onSolved?.(false);
      }
    }
  };

  const handleSyllableClick = (syllable: string) => {
    if (isComplete) return;

    const emptyIndex = placedSyllables.findIndex(s => s === null);
    if (emptyIndex !== -1) {
      const isCorrect = validateAttempt(syllable, emptyIndex);
      const newPlaced = [...placedSyllables];
      newPlaced[emptyIndex] = syllable;
      setPlacedSyllables(newPlaced);
      setRemainingSyllables(prev => prev.filter(s => s !== syllable));
      checkWordCompletion(newPlaced);
    }
  };

  const handleDrop = (syllable: string, boxIndex: number) => {
    if (isComplete) return;

    if (placedSyllables[boxIndex] === null) {
      const isCorrect = validateAttempt(syllable, boxIndex);
      const newPlaced = [...placedSyllables];
      newPlaced[boxIndex] = syllable;
      setPlacedSyllables(newPlaced);
      setRemainingSyllables(prev => prev.filter(s => s !== syllable));
      checkWordCompletion(newPlaced);
    }
  };

  const handleDragStart = (e: React.DragEvent, syllable: string) => {
    e.dataTransfer.setData('text/plain', syllable);
  };

  const handleBoxDrop = (e: React.DragEvent, index: number) => {
    const syllable = e.dataTransfer.getData('text/plain');
    handleDrop(syllable, index);
  };

  const resetGame = () => {
    setPlacedSyllables(Array(correctSyllables.length).fill(null));
    setRemainingSyllables([...correctSyllables].sort(() => Math.random() - 0.5));
    setLastAttempt(null);
    setIsComplete(false);
    setHasNotified(false);
  };

  return (
    <div className="flex justify-center items-center gap-8 max-w-3xl ">
      <Image src={imageSrc} alt={word} width={100} height={100} className="rounded-lg" />

      <div className="flex flex-col items-center gap-4 ">
        <div className="flex gap-2 flex-wrap justify-center">
          {remainingSyllables.map((syllable, index) => (
            <div
              key={index}
              className="bg-blue-200 cursor-pointer px-4 py-2 rounded-xl text-lg font-bold hover:bg-blue-300 transition-all"
              draggable
              onDragStart={(e) => handleDragStart(e, syllable)}
              onClick={() => handleSyllableClick(syllable)}
            >
              {syllable}
            </div>
          ))}
        </div>

        <div className="flex gap-2 min-h-[48px] mt-2">
          {placedSyllables.map((syllable, index) => (
            <div
              key={index}
              className={`w-14 h-12 border-2 border-dashed rounded-lg flex items-center justify-center bg-white shadow-inner text-xl font-bold ${
                syllable && syllable !== correctSyllables[index] ? 'text-red-500' : 'text-blue-300'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleBoxDrop(e, index)}
            >
              {syllable}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};
