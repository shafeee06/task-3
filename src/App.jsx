import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [spots, setSpots] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const newSpot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setSpots((prev) => [...prev.slice(-4), newSpot]);
    };

    const handleClick = (e) => {
      const burst = Array.from({ length: 15 }).map((_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 4 + 2,
        id: Date.now() + i,
      }));
      setParticles((prev) => [...prev, ...burst]);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed,
            y: p.y + Math.sin(p.angle) * p.speed,
            speed: p.speed * 0.95,
          }))
          .filter((p) => p.speed > 0.5)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <div className="video-background">
        <video 
          className="background-video" 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/videos/starry-night.mp4">
          <source src="/videos/starry-night.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="parallax layer layer1" />
      <div className="parallax layer layer2" />
      <div className="parallax layer layer3" />
      <img
        src="/images/astro.png"
        alt="Astronaut"
        className="astronaut"
      />

      {spots.map((spot, index) => (
        <div
          key={spot.id}
          className="spotlight"
          style={{
            left: spot.x,
            top: spot.y,
            opacity: 1 - index * 0.2,
            width: `${200 - index * 20}px`,
            height: `${200 - index * 20}px`,
          }}
        />
      ))}

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}

      <div className="content">
        <h1>Explore the Cosmos</h1>
        <p>A Journey Through Space Awaits🌌🛸🌠</p>
      </div>
      <div className="moon-container">
        <div className="quote-moon">
          <span>Shoot for the moon</span><br />
          <span>Even if you miss,</span><br />
          <span>You'll land among the stars.</span>
        </div>
      </div>
      <img src="/images/moon.png" alt="moon" className="moon" />

      {[...Array(4)].map((_, i) => (
        <div key={i} className={`shooting-star star-${i}`} />
      ))}
    </div>
  );
}

export default App;
