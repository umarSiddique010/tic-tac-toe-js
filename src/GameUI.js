export class GameUI {
    constructor(parameters) {
        this.liveFeedback = document.querySelector("#liveFeedback")
        this.winMatch = document.querySelector("#winMatch")
        this.loseMatch = document.querySelector("#loseMatch")
        this.resetGameBtn = document.querySelector("#resetGameBtn")
        this.playAgainGameBtn = document.querySelector("#playAgainGameBtn")
        this.playerOne = document.querySelector("#playerOne");
        this.playerTwo = document.querySelector("#playerTwo");
        this.formContainer = document.querySelector(".form-container");
       this.resultContainer = document.querySelector(".result-container")
       this.submitBtn = document.querySelector("#submitBtn");

   


    }

}


export class OutputMsg extends GameUI {
  
    constructor(){
        super()
    }

    liveMsg(turnName){
        this.liveFeedback.textContent = `${turnName}'s turn`
    }


    resultMsg(winnerName, loserName){
        this.winMatch.textContent = `${winnerName} win the match 🎉`
        this.loseMatch.textContent = `${loserName}, better luck next time 🤞`
    }

    drawMsg() {
        this.winMatch.textContent = "It's a Draw"
        this.loseMatch.textContent = "🤝"
    }

    clearMsg() {
        this.liveFeedback.textContent = ""
        this.winMatch.textContent = ""
        this.loseMatch.textContent = ""
    }
}


export class HandleInput extends GameUI {
    constructor(outputMsg, gameSound) {
        super(outputMsg)
        this.gameSound = gameSound
        this.outputMsg = outputMsg
        this.playerOneName = ""
        this.playerTwoName = ""
    }
    


    



    submitHandler() {
        
        const playerOneNameValue = this.playerOne.value.trim()
        const playerTwoNameValue = this.playerTwo.value.trim()
        
        
        if(playerOneNameValue === "" ||  playerTwoNameValue === ""){
            alert("Please enter name of both player")
            return
        }

        this.gameSound.playGameStartAudio()
        

        this.playerOneName = playerOneNameValue
        this.playerTwoName = playerTwoNameValue

        if (!(this.formContainer.classList.contains("hidden"))) {
            this.formContainer.classList.add("hidden");
        }
        this.outputMsg.liveMsg(this.playerOneName);

    }

 

    clearInput() {
        this.playerOne.value = "";
        this.playerTwo.value = "";
        this.playerOneName = ""
        this.playerTwoName = ""
    }


}