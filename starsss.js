import * as THREE from "three";
export function generateStars(count) {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.1,
    sizeAttenuation: true
  });

  const starsVertices = [];
  for(let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100; 
    const z = (Math.random() - 0.5) * 100;
    starsVertices.push(x, y, z);
  }

  starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starsVertices, 3)
  );

  const stars = new THREE.Points(starsGeometry, starsMaterial);

  // Add animation function
  const speed = 0.025; // Adjust speed as needed
  stars.tick = () => {
    const positions = starsGeometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += speed; // Move along z-axis
      
      // Reset position when star goes too far
      if(positions[i + 2] > 50) {
        positions[i + 2] = -50;
      }
    }
    starsGeometry.attributes.position.needsUpdate = true;
  };

  return stars;
}


