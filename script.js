const music = document.getElementById("bgMusic");
let musicStarted = false;

const texto = [

"✔ Sistema iniciado",

"✔ Memórias encontradas",

"✔ Fotos encontradas",

"✔ Alegria detectada",

"",

"Arquivo especial localizado",

"",

"mana_15_anos.exe"

];

const bootText = document.getElementById("bootText");

const startButton = document.getElementById("startButton");

let i = 0;

function escrever(){

    if(i<texto.length){

        bootText.innerHTML += texto[i] + "\n";

        i++;

        setTimeout(escrever,600);

    }

    else{

        startButton.style.display="block";

    }

}

startButton.style.display="none";

escrever();

const scenes=document.querySelectorAll(".scene");

function showScene(id){

    document.querySelectorAll(".scene").forEach(scene=>{
        scene.classList.add("hidden");
    });

    const next = document.getElementById(id);

    next.classList.remove("hidden");

}

startButton.onclick=()=>{

    if(!musicStarted){

    music.volume = 0;

    music.play().then(()=>{

        gsap.to(music, {
            volume: 1,
            duration: 3,
            ease: "power2.out"
        });

    }).catch(err=>{
        console.log("Áudio bloqueado:", err);
    });

    musicStarted = true;
}

    gsap.to("#boot",{

        opacity:0,

        duration:1,

        onComplete(){

            document.getElementById("boot").style.display="none";

            showScene("home");

            gsap.from("#home",{

                opacity:0,

                y:80,

                duration:1.5,

                ease:"power3.out"

            });

        }

    });

};

const fotos=[

{
imagem:"1.jpg",

titulo:"Tudo começou em 2011",

texto:"Quando uma menina nasceu, cresceu, e hoje(ontem) faz(fez) 15 anos..."
},

{
imagem:"2.jpg",

titulo:"Os primeiros passos",

texto:"para nós construirmos uma vida de programador e designer!"
},

{
imagem:"3.jpg",

titulo:"Te amo!",

texto:"Cada foto guarda a Sua IMENSA BELEZA!"
},

{
imagem:"4.jpg",

titulo:"O tempo passou",

texto:"Parece que foi ontem... mas hoje você completa 15 anos."
},

{
imagem:"5.jpg",

titulo:"Seu jeito único",

texto:"Seu sorriso, sua personalidade e seu coração fazem você ser quem é."
},

{
imagem:"6.jpg",

titulo:"Novos sonhos",

texto:"Que essa nova fase seja cheia de oportunidades e felicidade."
},

{
imagem:"7.jpg",

titulo:"Uma nova etapa",

texto:"15 anos de brigas, mas mesmo assim eu te amo❤️"
},

{
imagem:"8.jpg",

titulo:"Feliz aniversário",

texto:"Que Deus continue iluminando seus passos todos os dias."
}

];

let indice=0;

const img=document.getElementById("photo");
const titulo=document.getElementById("photoTitle");
const textoFoto=document.getElementById("photoText");

function mostrarFoto(){

    img.src=fotos[indice].imagem;

    titulo.textContent=fotos[indice].titulo;

    textoFoto.textContent=fotos[indice].texto;

    img.style.transform="scale(1)";

    setTimeout(()=>{

        img.style.transform="scale(1.08)";

    },100);

}

mostrarFoto();

document.getElementById("continue").onclick=()=>{

    showScene("gallery");

    gsap.from("#gallery",{

        opacity:0,

        duration:1

    });

}

document.getElementById("nextPhoto").onclick=()=>{

    gsap.to("#photo",{

        opacity:0,
        scale:0.98,
        duration:.5,

        onComplete(){

            indice++;

            // 👉 se chegou no final
            if(indice >= fotos.length){

                showGiftButton();

                return;

            }

            mostrarFoto();

            gsap.fromTo("#photo",
            {
                opacity:0,
                scale:1.02
            },
            {
                opacity:1,
                scale:1,
                duration:.6
            });

        }

    });

};

function showGiftButton(){

    const btn = document.getElementById("nextPhoto");

    btn.textContent = "Abrir presente 🎁";

    btn.onclick = openGift;

    gsap.fromTo(btn,
        { scale:0.8, opacity:0 },
        { scale:1, opacity:1, duration:0.8 }
    );

}

function openGift(){

    showScene("gift");

    const texto = new Typed("#giftText",{

        strings:[

            "Antes de continuar...",
            "Quero que você saiba que você é muito especial.",
            "Que Deus ilumine seus passos sempre.",
            "E que essa nova fase seja cheia de alegria.",
            "Feliz 15 anos ❤️"

        ],

        typeSpeed:40,
        backSpeed:0,
        showCursor:true,
        loop: false
    });

}

document.getElementById("finalBtn").onclick=()=>{

    gsap.to("#gift",{

        opacity:0,
        duration:1,

        onComplete(){

            showFinal();

        }

    });

};

const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");

function resize(){
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const stars = Array.from({length:120}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5,
    v: Math.random() * 0.3 + 0.1
}));

function drawStars(){

    sctx.fillStyle = "rgb(43, 43, 178)";
sctx.fillRect(0,0,starCanvas.width,starCanvas.height);


    stars.forEach(star =>{

        sctx.globalAlpha = 0.8;

        sctx.beginPath();
        sctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        sctx.fill();

        star.y += star.v;

        if(star.y > starCanvas.height){
            star.y = 0;
            star.x = Math.random() * starCanvas.width;
        }

    });

    requestAnimationFrame(drawStars);
}

drawStars();

const fcanvas = document.getElementById("fireworks");
const fctx = fcanvas.getContext("2d");

function resizeFire(){
    fcanvas.width = window.innerWidth;
    fcanvas.height = window.innerHeight;
}
resizeFire();
window.addEventListener("resize", resizeFire);

let particles = [];

function createFirework(){

    for(let i=0;i<60;i++){

        particles.push({

            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.6,

            vx:(Math.random()-0.5)*6,
            vy:(Math.random()-0.5)*6,

            life:100,
            color:`hsl(${Math.random()*360},100%,70%)`

        });

    }

}

function updateFireworks(){

    fctx.clearRect(0,0,fcanvas.width,fcanvas.height);

    for(let i = particles.length - 1; i >= 0; i--){

    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    fctx.globalAlpha = p.life/100;
    fctx.fillStyle = p.color;

    fctx.beginPath();
    fctx.arc(p.x,p.y,2,0,Math.PI*2);
    fctx.fill();

    if(p.life <= 0){
        particles.splice(i,1);
    }
}

    requestAnimationFrame(updateFireworks);
}

updateFireworks();

function showFinal(){

    gsap.to(music, {
    volume: 0,
    duration: 4
});

    showScene("final");

    createFirework();

    setInterval(createFirework, 2500);

    if(window.finalTyped){
    window.finalTyped.destroy();
}

    window.finalTyped = new Typed("#finalText",{

        strings:[

"Que o Senhor te abençoe e te guarde.",
"Que Ele ilumine o seu caminho.",
"Que você tenha paz em todas as fases da vida.",
"Feliz 15 anos ❤️"

],

    typeSpeed: 40,
    backSpeed: 0,
    loop: false,
    showCursor: true

    });

}
