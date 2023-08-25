function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let bubbles = []; // Array para almacenar las burbujas

function setup() {
  createCanvas(1400, 10000); // Crea un lienzo de 1000x800 píxeles
  noStroke(); // Sin bordes en las burbujas
  frameRate(30); // Establece la velocidad de fotogramas
}

function draw() {
  background(255); // Fondo blanco

  // Agrega nuevas burbujas de colores al array de manera intermitente
  if (frameCount % 30 == 0) {
    let bubble = new Bubble(random(width), height, random(10, 50));
    bubbles.push(bubble);
  }

  // Muestra y actualiza las burbujas
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].display();
    bubbles[i].move();
    if (bubbles[i].y < 0 || bubbles[i].popped) {
      // Elimina las burbujas que llegan arriba o han sido estalladas
      bubbles.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Verifica si se ha hecho clic en alguna burbuja
  for (let i = bubbles.length - 1; i >= 0; i--) {
    let d = dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y);
    if (d < bubbles[i].radius) {
      bubbles[i].pop(); // Estalla la burbuja si se hace clic en ella
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.speed = random(1, 3);
    this.color = color(random(255), random(255), random(255)); // Color aleatorio
    this.sparkles = []; // Array para almacenar brillos
    this.popped = false; // Estado de la burbuja
  }

  display() {
    // Dibuja la burbuja de color del arcoíris
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);

    // Agrega brillos aleatorios
    let sparkle = random(1);
    if (sparkle < 0.1) {
      this.sparkles.push(new Sparkle(this.x, this.y));
    }

    // Muestra y actualiza los brillos
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      this.sparkles[i].display();
      this.sparkles[i].move();
      if (this.sparkles[i].alpha <= 0) {
        // Elimina los brillos cuando desaparecen
        this.sparkles.splice(i, 1);
      }
    }
  }

  move() {
    // Mueve la burbuja hacia arriba
    this.y -= this.speed;
  }

  pop() {
    // Estalla la burbuja
    this.popped = true;
  }
}

class Sparkle {
  constructor(x, y) {
    this.x = x + random(-5, 5);
    this.y = y + random(-5, 5);
    this.alpha = 255; // Opacidad inicial
    this.fadeSpeed = random(2, 5); // Velocidad de desvanecimiento
  }

  display() {
    fill(255, this.alpha); // Color blanco con opacidad
    ellipse(this.x, this.y, 5);
  }

  move() {
    // Reduce la opacidad con el tiempo
    this.alpha -= this.fadeSpeed;
  }
}
