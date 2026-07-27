import React, { useMemo } from 'react';
import styles from './BackgroundLights.module.css';

// Define the exact constellations mapped from alitaptap_imgg.png
const constellations = [
  {
    id: 'top-left',
    top: '15%', left: '20%', size: 'clamp(80px, 12vw, 150px)',
    points: [{ x: 40, y: 40 }, { x: 10, y: 20 }, { x: 80, y: 50 }, { x: 30, y: 80 }],
    lines: [[0, 1], [0, 2], [0, 3]] // Connects center to outer stars
  },
  {
    id: 'top-right',
    top: '18%', left: '80%', size: 'clamp(70px, 10vw, 130px)',
    points: [{ x: 10, y: 60 }, { x: 40, y: 70 }, { x: 70, y: 50 }, { x: 90, y: 20 }],
    lines: [[0, 1], [1, 2], [2, 3]] // Forms the arc
  },
  {
    id: 'bottom-left',
    top: '65%', left: '15%', size: 'clamp(100px, 15vw, 180px)',
    points: [{ x: 10, y: 20 }, { x: 80, y: 10 }, { x: 70, y: 60 }, { x: 100, y: 90 }],
    lines: [[0, 1], [1, 2], [2, 3]] // Forms the zigzag
  },
  {
    id: 'bottom-right',
    top: '70%', left: '85%', size: 'clamp(90px, 14vw, 160px)',
    points: [{ x: 40, y: 10 }, { x: 50, y: 40 }, { x: 10, y: 60 }, { x: 80, y: 50 }, { x: 100, y: 90 }],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4]] // Forms the branching path
  },
  {
    id: 'mid-right',
    top: '45%', left: '75%', size: 'clamp(50px, 8vw, 90px)',
    points: [{ x: 20, y: 20 }, { x: 50, y: 50 }, { x: 80, y: 40 }],
    lines: [[0, 1], [1, 2]] // Forms the small angle
  }
];

export default function BackgroundLights({ children }) {
  // Generate random static background stars with twinkling delays
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100, 
      left: Math.random() * 100,
      size: 1 + Math.random() * 2, // Tiny background dots
      duration: 3 + Math.random() * 5, // Twinkle speed
      delay: Math.random() * -10, // Offset animations
    }));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.starsWrapper}>
        
        {/* Render Random Scattered Stars */}
        {backgroundStars.map((star) => (
          <div
            key={`bg-star-${star.id}`}
            className={styles.star}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--duration': `${star.duration}s`,
              '--delay': `${star.delay}s`,
            }}
          />
        ))}

        {/* Render SVG Constellations */}
        {constellations.map((constellation) => (
          <svg
            key={constellation.id}
            className={styles.constellation}
            style={{
              top: constellation.top,
              left: constellation.left,
              width: constellation.size,
              height: constellation.size,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Draw faint connecting lines */}
            {constellation.lines.map((line, idx) => {
              const p1 = constellation.points[line[0]];
              const p2 = constellation.points[line[1]];
              return (
                <line
                  key={`line-${idx}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(255, 202, 40, 0.25)"
                  strokeWidth="0.8"
                />
              );
            })}
            
            {/* Draw constellation stars */}
            {constellation.points.map((p, idx) => (
              <circle
                key={`point-${idx}`}
                cx={p.x}
                cy={p.y}
                r="1.8"
                fill="#ffca28"
                className={styles.constellationStar}
              />
            ))}
          </svg>
        ))}
      </div>

      {/* Content overlay */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}