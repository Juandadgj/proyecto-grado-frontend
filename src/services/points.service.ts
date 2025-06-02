interface GamePoints {
  totalPoints: number;
  games: {
    [key: string]: {
      points: number;
      attempts: number;
      completed: boolean;
    };
  };
}

const POINTS_STORAGE_KEY = 'game_points';

export const getPoints = (): GamePoints => {
  if (typeof window === 'undefined') return { totalPoints: 0, games: {} };

  const storedPoints = localStorage.getItem(POINTS_STORAGE_KEY);
  if (!storedPoints) {
    return { totalPoints: 0, games: {} };
  }

  return JSON.parse(storedPoints);
};

export const savePoints = async (
  gameId: string,
  points: number,
  attempts: number,
  completed: boolean
) => {
  const currentPoints = getPoints();

  // Actualizar puntos del juego específico
  currentPoints.games[gameId] = {
    points,
    attempts,
    completed,
  };

  // Recalcular puntos totales
  currentPoints.totalPoints = Object.values(currentPoints.games)
    .filter((game) => game.completed)
    .reduce((total, game) => total + game.points, 0);

  localStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(currentPoints));

  // Si el juego está completado, guardar en la base de datos
  if (completed) {
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: gameId,
          score: points,
        }),
        credentials: 'include', // Importante: incluir las cookies en la petición
      });

      if (!response.ok) {
        console.error(
          'Error al guardar la calificación en la base de datos:',
          response.statusText
        );
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al guardar la calificación:', error);
      throw error;
    }
  }

  return currentPoints;
};

export const resetPoints = () => {
  localStorage.removeItem(POINTS_STORAGE_KEY);
};

export const getTotalPointsFromDB = async (): Promise<number> => {
  try {
    const response = await fetch('/abclick/api/ratings/total', {
      method: 'GET',
      credentials: 'include', // Importante: incluir las cookies en la petición
    });

    if (!response.ok) {
      console.error(
        'Error al obtener el total de puntos:',
        response.statusText
      );
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.totalPoints;
  } catch (error) {
    console.error('Error al obtener el total de puntos:', error);
    throw error;
  }
};
