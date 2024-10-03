"use client"

import { useState } from "react";
import Image from "next/image";
import React from "react";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Sapo",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 1,
      img: "/abcGame/SAPO.jpg",
    },
    {
      id: 2,
      title: "Rana",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 1,
      img: "/abcGame/RANA.jpg",
    },
    {
      id: 3,
      title: "Caballo",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 3,
      img: "/abcGame/CABALLO.jpg",
    },
    {
      id: 4,
      title: "Ratón",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 2,
      img: "/abcGame/RATÓN.jpg",
    },
    {
      id: 5,
      title: "Elefante",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 2,
      img: "/abcGame/ELEFANTE.jpg",
    },
  ]);

  const getList = (list: any) => {
    return tasks.filter((item) => item.list === list);
  };

  const startDrag = (evt: any, item: any) => {
    evt.dataTransfer.setData("itemID", item.id);
    console.log(item);
  };

  const draggingOver = (evt: any) => {
    evt.preventDefault();
  };

  const onDrop = (evt: any, list: any) => {
    const itemID = evt.dataTransfer.getData("itemID");
    const item: any = tasks.find((item) => item.id == itemID);
    item.list = list;

    const newState = tasks.map((task) => {
      if (task.id == itemID) return item;
      return task;
    });

    setTasks(newState);
  };

  return (
    <>
      <h1 color="black">Arrastrar y Soltar</h1>
      <br />

      <div className="drag-and-drop">
        <div className="column column--1">
          <h3 color="black">Animales</h3>
          <div
            className="dd-zone"
            onDragOver={draggingOver}
            onDrop={(evt) => onDrop(evt, 1)}
          >
            {getList(1).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <strong className="title">{item.title}</strong>
                <img src={item.img} alt="card" className="h-36 w-36" />
              </div>
            ))}
          </div>
        </div>

        <div className="column column--2">
          <h3 color="black">Animalitos</h3>
          <div
            className="dd-zone"
            onDragOver={draggingOver}
            onDrop={(evt) => onDrop(evt, 2)}
          >
            {getList(2).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <strong className="title">{item.title}</strong>
                <img src={item.img} alt="card" className="h-36 w-36" />
              </div>
            ))}
          </div>
        </div>

        <div className="column column--3">
          <h3 color="black">Animalotes</h3>
          <div
            className="dd-zone"
            onDragOver={draggingOver}
            onDrop={(evt) => onDrop(evt, 3)}
          >
            {getList(3).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <strong className="title">{item.title}</strong>
                <img src={item.img} alt="card" className="h-36 w-36" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
