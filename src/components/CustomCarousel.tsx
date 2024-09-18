import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "420px",
  color: "#fff",
  textAlign: "center",
  background: "#00C1FF",
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px'
};

const cuento: { id: number; img: string; pageNumber: number }[] = [
  { id: 1, img: "/cuentos/1.png", pageNumber: 1 },
  { id: 2, img: "/cuentos/2.png", pageNumber: 2 },
  { id: 3, img: "/cuentos/3.png", pageNumber: 3 },
  { id: 4, img: "/cuentos/4.png", pageNumber: 4 },
  { id: 5, img: "/cuentos/5.png", pageNumber: 5 },
  { id: 6, img: "/cuentos/6.png", pageNumber: 6 },
  { id: 7, img: "/cuentos/7.png", pageNumber: 7 },
  { id: 8, img: "/cuentos/8.png", pageNumber: 8 },
  { id: 9, img: "/cuentos/9.png", pageNumber: 9 },
  { id: 10, img: "/cuentos/10.png", pageNumber: 10 },
];

const CustomCarousel: React.FC = () => (
  <>
    <br />
    <Carousel arrows infinite={false}>
      {cuento.map((c) => (
        <div className="flex justify-center items-center">
          <div style={contentStyle}>
            <img src={c.img} alt="" className="h-[380px] w-[350px] rounded" />
          </div>
        </div>
      ))}
    </Carousel>
    <br />
  </>
);

export default CustomCarousel;
