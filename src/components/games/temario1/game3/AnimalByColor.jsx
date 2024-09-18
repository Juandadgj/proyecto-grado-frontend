import React from "react";

const AnimalByColor = ({ setWhatGame, whatGame }) => {
  const imgs = [
    {
      id: 1,
      img: "/abcGame/SAPO.jpg",
      word: "Sapo",
    },
    {
      id: 2,
      img: "/abcGame/RANA.jpg",
      word: "Rana",
    },
    {
      id: 3,
      img: "/abcGame/CABALLO.jpg",
      word: "Caballo",
    },
    {
      id: 4,
      img: "/abcGame/RATÓN.jpg",
      word: "Ratón",
    },
    {
      id: 5,
      img: "/abcGame/ELEFANTE.jpg",
      word: "Elefante",
    },
  ];
  return (
    <div>
      {imgs.map((i) => (
        <div className="card">
          <img src={i.img} alt="card" />
        </div>
      ))}
    </div>
  );
};

export default AnimalByColor;
