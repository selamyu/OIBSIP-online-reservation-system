import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Home.module.css"

import img1 from "../Home/Images/img1.jpg"
import img2 from "../Home/Images/img2.jpg";
import img3 from "../Home/Images/img3.jpg";
import img4 from "../Home/Images/img4.jpg";
import img5 from "../Home/Images/img5.jpg";
import img6 from "../Home/Images/img6.jpg";

const Home = () => {
  return (
		<div className={styles.container}>
			<Carousel
				autoPlay
				infiniteLoop
				showThumbs={false}
				showStatus={false}
				interval={3000}
			>
				<div>
					<img src={img1} alt="landscape 1" />
				</div>
				<div>
					<img src={img2} alt="landscape 2" />
				</div>
				<div>
					<img src={img3} alt="landscape 3" />
				</div>
				<div>
					<img src={img4} alt="landscape 4" />
				</div>
				<div>
					<img src={img5} alt="landscape 5" />
				</div>
				<div>
					<img src={img6} alt="landscape 6" />
				</div>
			</Carousel>
			<div className={styles.centeredText}>
				<h1>Welcome to our Online Reservation System</h1>
			</div>
		</div>
  );
};

export default Home;