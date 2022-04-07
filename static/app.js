userScore = 0;
$(".endgame").hide()
async function handleFormSubmit(event) {
    event.preventDefault();

    let guess = $("input").val();

    const res = await axios.get("/check_valid_word", { params: { guess: guess } });


    checkResponseAndDisplayText(res)

    keepAndDisplayScore(res, guess.length)

    $("input").val("");

}




function checkResponseAndDisplayText(res) {

    if (res.data['result'] == "ok") {
        $("#outcome").text("Awesome!")
    } else if (res.data['result'] == "not-on-board") {
        $("#outcome").text("Valid word, but it's not on the board.")
    } else {
        $("#outcome").text("Oops, not a valid word.")
    }
}



function keepAndDisplayScore(res, guessLen) {
    if (res.data["result"] == "ok") {
        userScore += guessLen
    }

    $("#score").text(`Score: ${userScore}`);
}


function displayTimer() {
    let timeSeconds = 60;

    $("#timer").text(`Timer: ${timeSeconds}`)

    let countDown = setInterval(() => {
        $("#timer").text(`Timer: ${timeSeconds}`)
        timeSeconds--;
        if (timeSeconds == -1) {
            clearInterval(countDown)
            $(".container, .timer_score_container").hide();
            $("#endMessage").text(`Final Score: ${userScore}`)
            $(".endgame").show()
        }
    }, 1000)
}



$("form").on("submit", handleFormSubmit);
displayTimer()





