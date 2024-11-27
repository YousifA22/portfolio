document.addEventListener("DOMContentLoaded", () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bgCanvas") });
  
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
  
    // Add Stars (moving towards camera for spaceship effect)
    const starGeometry = new THREE.SphereGeometry(0.15, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const stars = [];
  
    function addStar() {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
      star.position.set(x, y, z);
      scene.add(star);
      stars.push(star);
    }
  
    // Increase the number of stars from 200 to 500
    Array(500).fill().forEach(addStar);
  
    let baseSpeed = 0.5; // Base speed for stars moving forward
  
    // Animate Stars for Spaceship Effect
    function moveStars() {
      stars.forEach((star) => {
        star.position.z += baseSpeed;
        if (star.position.z > 30) {
          star.position.z = -100;
        }
      });
    }
  
    // Set Background Color
    scene.background = new THREE.Color(0x1C1D25);
  
    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      moveStars();
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Resize the canvas when the window is resized
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Toggle Experience Details (Smoother Animation with GSAP)
    const toggles = document.querySelectorAll('.experience-toggle');
    toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        if (content.style.display === 'none' || content.style.display === '') {
          gsap.to(content, { height: 'auto', opacity: 1, duration: 0.5 });
          content.style.display = 'block';
        } else {
          gsap.to(content, { height: 0, opacity: 0, duration: 0.5, onComplete: () => content.style.display = 'none' });
        }
      });
    });
  
    // Darken Background on Scroll and Increase Star Speed
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
  
      // Adjust star speed based on scroll position
      baseSpeed = 0.5 + (scrollPosition / maxScroll) * 1.0; // Speed increases moderately as you scroll, max at around 2.4
    });
  });
  