const state = {
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        lives:document.querySelector("#lives")
    },
    values:{
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        currentTime:60,
        lives:3,
    },
    actions:{
        timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
    sounds:{
        hit:'hit',
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        gameOver();
    }
}

function playSound(soundName){
    let audio = new Audio(`./src/audios/${soundName}.m4a`);
    audio.volume = 0.2
    audio.play();
}


function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition=randomSquare.id

}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound(state.sounds.hit);
            }
            else{
                state.values.lives--;
                if(state.values.lives<0){
                    gameOver();
                }
                else{
                    state.view.lives.textContent=`x${state.values.lives}`;
                }
            }
        })
    });
}

function initialize(){
    addListenerHitBox()
}

function gameOver(){
    
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    alert(`Game Over! O seu resultado foi ${state.values.result}`);

    setTimeout(()=>{
        alert("Clique em OK e aguarde alguns segundos!");
        location.reload();
    },1000)

}

initialize();
