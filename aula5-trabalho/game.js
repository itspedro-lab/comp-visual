const TOLERANCIA_COLISAO = 0.5;

class Bolinha {
  constructor(x, y, raio, velocidadeX, velocidadeY, cor) {
    this.x = x;
    this.y = y;
    this.raio = raio;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.cor = cor;
    this.colidiuNoCanto = false;
  }

  desenhar(contexto) {
    contexto.beginPath();
    contexto.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
    contexto.fillStyle = this.cor;
    contexto.fill();
    contexto.closePath();
  }

  mover() {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
  }

  verificarColisao(canvas) {
    const bateuEsquerda = this.x - this.raio <= TOLERANCIA_COLISAO;
    const bateuDireita =
      this.x + this.raio >= canvas.width - TOLERANCIA_COLISAO;
    const bateuEmCima = this.y - this.raio <= TOLERANCIA_COLISAO;
    const bateuEmBaixo =
      this.y + this.raio >= canvas.height - TOLERANCIA_COLISAO;

    const bateuHorizontal = bateuEsquerda || bateuDireita;
    const bateuVertical = bateuEmCima || bateuEmBaixo;

    const bateuNoCanto = this.detectarCanto(bateuHorizontal, bateuVertical);

    // const bateuNoCanto = this.detectarBordaComoCanto(
    //   bateuHorizontal,
    //   bateuVertical,
    // );

    if (bateuEsquerda) {
      this.x = this.raio;
      this.velocidadeX = Math.abs(this.velocidadeX);
    } else if (bateuDireita) {
      this.x = canvas.width - this.raio;
      this.velocidadeX = -Math.abs(this.velocidadeX);
    }

    if (bateuEmCima) {
      this.y = this.raio;
      this.velocidadeY = Math.abs(this.velocidadeY);
    } else if (bateuEmBaixo) {
      this.y = canvas.height - this.raio;
      this.velocidadeY = -Math.abs(this.velocidadeY);
    }

    if (bateuNoCanto) {
      if (!this.colidiuNoCanto) {
        this.colidiuNoCanto = true;
        return true;
      }
    } else {
      this.colidiuNoCanto = false;
    }

    return false;
  }

  detectarCanto(bateuHorizontal, bateuVertical) {
    return bateuHorizontal && bateuVertical;
  }

  detectarBordaComoCanto(bateuHorizontal, bateuVertical) {
    return bateuHorizontal || bateuVertical;
  }
}

class Jogo {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.contexto = this.canvas.getContext("2d");
    this.elementoQuantidade = document.getElementById("quantidade");
    this.bolinhas = [];

    this.criarBolinhaInicial();
  }

  criarBolinhaInicial() {
    const raio = 10;

    const centroX = this.canvas.width / 2;
    const centroY = this.canvas.height / 2;

    const distanciaX = this.canvas.width - raio - centroX;
    const distanciaY = this.canvas.height - raio - centroY;

    const velocidadeX = 2;
    const velocidadeY = velocidadeX * (distanciaY / distanciaX);

    const bolinha = new Bolinha(
      centroX,
      centroY,
      raio,
      velocidadeX,
      velocidadeY,
      this.gerarCor(),
    );

    this.bolinhas.push(bolinha);
  }

  gerarCor() {
    const vermelho = Math.floor(Math.random() * 256);
    const verde = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);

    return `rgb(${vermelho}, ${verde}, ${azul})`;
  }

  duplicarBolinha(bolinha) {
    const novaBolinha = new Bolinha(
      bolinha.x,
      bolinha.y,
      bolinha.raio,
      bolinha.velocidadeX,
      bolinha.velocidadeY,
      this.gerarCor(),
    );

    novaBolinha.x += novaBolinha.velocidadeX * 2;
    novaBolinha.y += novaBolinha.velocidadeY * 2;

    this.bolinhas.push(novaBolinha);
  }

  verificarColisoesEntreBolinhas() {
    for (let i = 0; i < this.bolinhas.length; i++) {
      for (let j = i + 1; j < this.bolinhas.length; j++) {
        this.resolverColisaoEntreBolinhas(this.bolinhas[i], this.bolinhas[j]);
      }
    }
  }

  resolverColisaoEntreBolinhas(bolinhaA, bolinhaB) {
    const distanciaX = bolinhaB.x - bolinhaA.x;
    const distanciaY = bolinhaB.y - bolinhaA.y;
    const distanciaCalculada = Math.hypot(distanciaX, distanciaY);
    const distancia = distanciaCalculada || 1;
    const distanciaMinima = bolinhaA.raio + bolinhaB.raio;

    if (distancia >= distanciaMinima) {
      return;
    }

    const normalX = distanciaCalculada === 0 ? 1 : distanciaX / distancia;
    const normalY = distanciaCalculada === 0 ? 0 : distanciaY / distancia;
    const sobreposicao = distanciaMinima - distancia;

    bolinhaA.x -= (normalX * sobreposicao) / 2;
    bolinhaA.y -= (normalY * sobreposicao) / 2;
    bolinhaB.x += (normalX * sobreposicao) / 2;
    bolinhaB.y += (normalY * sobreposicao) / 2;

    const diferencaVelocidadeX = bolinhaA.velocidadeX - bolinhaB.velocidadeX;
    const diferencaVelocidadeY = bolinhaA.velocidadeY - bolinhaB.velocidadeY;
    const velocidadeRelativa =
      diferencaVelocidadeX * normalX + diferencaVelocidadeY * normalY;

    if (Math.abs(velocidadeRelativa) < 0.01) {
      this.abrirTrajetorias(bolinhaA, bolinhaB);
      return;
    }

    if (velocidadeRelativa > 0) {
      bolinhaA.velocidadeX -= velocidadeRelativa * normalX;
      bolinhaA.velocidadeY -= velocidadeRelativa * normalY;
      bolinhaB.velocidadeX += velocidadeRelativa * normalX;
      bolinhaB.velocidadeY += velocidadeRelativa * normalY;
    }
  }

  abrirTrajetorias(bolinhaA, bolinhaB) {
    const angulo = Math.atan2(bolinhaA.velocidadeY, bolinhaA.velocidadeX);
    const velocidadeA = Math.hypot(bolinhaA.velocidadeX, bolinhaA.velocidadeY);
    const velocidadeB = Math.hypot(bolinhaB.velocidadeX, bolinhaB.velocidadeY);
    const abertura = 0.35;

    bolinhaA.velocidadeX = Math.cos(angulo - abertura) * velocidadeA;
    bolinhaA.velocidadeY = Math.sin(angulo - abertura) * velocidadeA;
    bolinhaB.velocidadeX = Math.cos(angulo + abertura) * velocidadeB;
    bolinhaB.velocidadeY = Math.sin(angulo + abertura) * velocidadeB;
  }

  atualizar() {
    const novasBolinhas = [];

    for (const bolinha of this.bolinhas) {
      bolinha.mover();

      const colidiuNoCanto = bolinha.verificarColisao(this.canvas);

      if (colidiuNoCanto) {
        novasBolinhas.push(bolinha);
      }
    }

    for (const bolinha of novasBolinhas) {
      this.duplicarBolinha(bolinha);
    }

    this.verificarColisoesEntreBolinhas();

    this.elementoQuantidade.textContent = this.bolinhas.length;
  }

  desenharFundo() {
    this.contexto.fillStyle = "#000";

    this.contexto.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.desenharEstrelas();
  }

  desenharEstrelas() {
    const quantidadeEstrelas = 40;

    this.contexto.fillStyle = "#ffffff";

    for (let i = 0; i < quantidadeEstrelas; i++) {
      const x = (i * 137) % this.canvas.width;
      const y = (i * 83) % this.canvas.height;

      this.contexto.fillRect(x, y, 2, 2);
    }
  }

  desenhar() {
    this.desenharFundo();

    for (const bolinha of this.bolinhas) {
      bolinha.desenhar(this.contexto);
    }
  }

  executar() {
    this.atualizar();
    this.desenhar();

    requestAnimationFrame(() => {
      this.executar();
    });
  }

  iniciar() {
    this.executar();
  }
}

const jogo = new Jogo("canvas");
jogo.iniciar();
