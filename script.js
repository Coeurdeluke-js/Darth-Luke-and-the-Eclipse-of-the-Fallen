const scenes = [
    {
      image: "0.png",
      text: "", // No text for the first scene
      duration: 5000 // Show for 5 seconds (longer duration)
    },
    {
      image: "1.png",
      text: "-There was a time when I believed in light. In justice. In the balance of the Force."
    },
    {
      image: "2.png",
      text: "-But all that vanished the day I was betrayed. Those I trusted turned their backs on me, and the pain... the pain consumed me."
    },
    {
      image: "3.png",
      text: "-That's when the dark side called me, and I... couldn't resist."
    },
    {
      image: "4.png",
      text: "-I am now Darth Luke, a Sith Lord. My left arm, lost in battle, has been replaced by the dark technology of the Sith. My left eye glows red with rage, while my right eye… well, I lost that one a long time ago."
    },
    {
        image: "5.png",
        text: "-My master, Darth Reed, has sent me to recover an ancient artifact, an object of unimaginable power. He claims it holds the key to dominating the galaxy, but I know the Sith cannot be trusted."
    },
    {
        image: "6.png",
        text: "-But what other choice do I have? The light has left me, and now I am left with only darkness."
    },
    {
        image: "7.png",
        text: "-But something inside me still fights. Something that hasn't been completely corrupted. Maybe this mission will be my redemption... or maybe it's the last step towards total doom."
    },
    {
        image: "8.png",
        text: "-Only time will tell. For now, I must move on. The galaxy fears me, and rightly so. I am Darth Luke, the fallen, the betrayed, the avenger. And my story… is far from over."
    }
];
  
let currentScene = 0;
let isTyping = false;
let typingTimeout;
let autoAdvanceTimeout;
const sceneImage = document.getElementById("scene-image");
const typewriterText = document.getElementById("typewriter-text");
const textContainer = document.getElementById("text-container");
const nextButton = document.getElementById("next-button");

// Función para efecto de escritura
function typeWriter(text, index = 0) {
  if (index < text.length) {
    isTyping = true;
    typewriterText.textContent += text.charAt(index);
    typingTimeout = setTimeout(() => typeWriter(text, index + 1), 50); // Ajusta velocidad aquí
  } else {
    isTyping = false;
    showElement(nextButton); // Mostrar el botón cuando termine de escribir
  }
}

// Detener el efecto de escritura
function stopTyping() {
  clearTimeout(typingTimeout);
  isTyping = false;
  typewriterText.textContent = ""; // Limpiar el texto inmediatamente
}

// Mostrar elemento con animación de fadeIn
function showElement(element) {
  if (!element) return;
  element.style.display = "block";
  // Reiniciar la animación
  element.style.animation = "none";
  element.offsetHeight; // Trigger reflow
  element.style.animation = "fadeIn 1s forwards";
}

// Ocultar elemento con animación de fadeOut
function hideElement(element, callback) {
  if (!element || element.style.display === "none") {
    if (callback) callback();
    return;
  }
  
  element.style.animation = "fadeOut 1s forwards";
  
  setTimeout(() => {
    element.style.display = "none";
    if (callback) callback();
  }, 1000); // Esperar a que termine la animación
}

// Transición entre imágenes
function transitionToImage(newImageSrc, callback) {
  // Solo hacer fadeOut si la imagen es diferente y ya está visible
  if (sceneImage.src.includes(newImageSrc) && parseFloat(getComputedStyle(sceneImage).opacity) > 0) {
    // Si es la misma imagen y ya está visible, no hacer nada
    if (callback) callback();
    return;
  }
  
  // Hacer fadeOut de la imagen actual
  sceneImage.style.animation = "fadeOut 1s forwards";
  
  setTimeout(() => {
    // Cambiar la fuente de la imagen
    sceneImage.src = newImageSrc;
    
    // Esperar un momento para asegurar que la nueva imagen se ha cargado
    setTimeout(() => {
      // Hacer fadeIn de la nueva imagen
      sceneImage.style.animation = "fadeIn 1s forwards";
      if (callback) callback();
    }, 100);
  }, 1000); // Esperar a que termine el fadeOut
}

// Cargar una escena
function loadScene(sceneIndex) {
  // Limpiar cualquier timeout pendiente
  clearTimeout(autoAdvanceTimeout);
  
  const scene = scenes[sceneIndex];
  if (!scene) return;

  // Ocultar el botón next
  hideElement(nextButton);
  
  // Detener cualquier efecto de escritura en progreso
  stopTyping();
  
  // Ocultar el contenedor de texto
  hideElement(textContainer, () => {
    // Transición a la nueva imagen
    transitionToImage(scene.image, () => {
      // Si hay texto, mostrarlo después de que la imagen aparezca
      if (scene.text) {
        setTimeout(() => {
          showElement(textContainer);
          typeWriter(scene.text);
        }, 1000);
      } else if (scene.duration) {
        // Si no hay texto pero hay duración, configurar avance automático
        autoAdvanceTimeout = setTimeout(() => {
          nextScene();
        }, scene.duration);
      }
    });
  });
}

// Mostrar el mensaje épico de "Desarrolladores trabajando"
function showEpicMessage() {
  // Ocultar elementos actuales
  hideElement(textContainer);
  hideElement(nextButton);
  
  // Crear el contenedor para el mensaje épico si no existe
  let epicContainer = document.getElementById("epic-message");
  if (!epicContainer) {
    epicContainer = document.createElement("div");
    epicContainer.id = "epic-message";
    epicContainer.style.position = "absolute";
    epicContainer.style.top = "50%";
    epicContainer.style.left = "50%";
    epicContainer.style.transform = "translate(-50%, -50%)";
    epicContainer.style.width = "80%";
    epicContainer.style.maxWidth = "600px";
    epicContainer.style.padding = "20px";
    epicContainer.style.backgroundColor = "rgba(18, 18, 18, 0.9)";
    epicContainer.style.borderRadius = "10px";
    epicContainer.style.textAlign = "center";
    epicContainer.style.fontFamily = "'Pixelify Sans', sans-serif";
    epicContainer.style.display = "none";
    epicContainer.style.boxShadow = "0 0 20px rgba(236, 77, 88, 0.5)";
    
    // Crear el contenedor interno para el texto y el botón
    const innerContainer = document.createElement("div");
    innerContainer.style.display = "flex";
    innerContainer.style.flexDirection = "column";
    innerContainer.style.alignItems = "center";
    innerContainer.style.gap = "30px";
    
    // Crear el texto épico
    const epicText = document.createElement("p");
    epicText.innerText = "THE DARK SIDE AWAITS YOUR RETURN...";
    epicText.style.color = "#ec4d58";
    epicText.style.fontSize = "24px";
    epicText.style.margin = "0";
    epicText.style.textShadow = "0 0 8px rgba(236, 77, 88, 0.5)";
    epicText.style.lineHeight = "1.5";
    
    // Crear el botón de aceptar
    const acceptButton = document.createElement("button");
    acceptButton.id = "accept-button";
    acceptButton.innerText = "Start Your Journey";
    acceptButton.style.position = "static"; // Cambiado de relative para evitar conflictos
    acceptButton.style.padding = "12px 24px";
    acceptButton.style.backgroundColor = "#ec4d58";
    acceptButton.style.color = "#fafafa";
    acceptButton.style.border = "none";
    acceptButton.style.borderRadius = "5px";
    acceptButton.style.cursor = "pointer";
    acceptButton.style.fontFamily = "'Pixelify Sans', sans-serif";
    acceptButton.style.fontSize = "18px";
    acceptButton.style.boxShadow = "0 0 10px rgba(236, 77, 88, 0.7)";
    acceptButton.style.transition = "transform 0.2s, box-shadow 0.2s";
    acceptButton.style.marginTop = "20px";
    acceptButton.style.display = "none"; // Inicialmente oculto
    
    // Efecto hover para el botón
    acceptButton.addEventListener("mouseenter", () => {
      acceptButton.style.transform = "scale(1.05)";
      acceptButton.style.boxShadow = "0 0 15px rgba(236, 77, 88, 0.9)";
    });
    
    acceptButton.addEventListener("mouseleave", () => {
      acceptButton.style.transform = "scale(1)";
      acceptButton.style.boxShadow = "0 0 10px rgba(236, 77, 88, 0.7)";
    });
    
    // Añadir el evento para reiniciar
    acceptButton.addEventListener("click", resetStory);
    
    // Añadir elementos al DOM
    innerContainer.appendChild(epicText);
    innerContainer.appendChild(acceptButton);
    epicContainer.appendChild(innerContainer);
    document.getElementById("scene-container").appendChild(epicContainer);
  }
  
  // Mostrar el contenedor épico con animación
  setTimeout(() => {
    showElement(epicContainer);
    
    // Mostrar el botón de aceptar después de unos segundos
    const acceptButton = document.getElementById("accept-button");
    if (acceptButton) {
      setTimeout(() => {
        showElement(acceptButton);
      }, 3000);
    }
  }, 1000);
}

// Reiniciar la historia
function resetStory() {
  // Ocultar el mensaje épico
  const epicContainer = document.getElementById("epic-message");
  if (epicContainer) {
    hideElement(epicContainer, () => {
      epicContainer.remove();
      
      // Reiniciar variables y cargar la primera escena
      currentScene = 0;
      loadScene(currentScene);
    });
  }
}

// Avanzar a la siguiente escena
function nextScene() {
  // Limpiar cualquier timeout pendiente
  clearTimeout(autoAdvanceTimeout);
  
  if (isTyping) {
    stopTyping();
  }
  
  hideElement(nextButton);
  
  currentScene++;
  if (currentScene < scenes.length) {
    loadScene(currentScene);
  } else {
    // Mostrar el mensaje épico en lugar de la alerta
    showEpicMessage();
  }
}

// Evento de clic para el botón next
nextButton.addEventListener("click", nextScene);

// Inicialización - Manejo especial para la primera escena
window.addEventListener('load', function() {
  // Para la primera escena, sabemos que 0.png ya está cargada en el HTML
  // Ocultar inicialmente los contenedores de texto y botón
  textContainer.style.display = "none";
  nextButton.style.display = "none";
  
  // La primera imagen ya está en el HTML, así que solo configuramos el avance automático
  const firstScene = scenes[0];
  if (firstScene.duration) {
    autoAdvanceTimeout = setTimeout(() => {
      nextScene(); // Avanzar automáticamente después de la duración especificada
    }, firstScene.duration);
  }
});
