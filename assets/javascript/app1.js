var triviaQuestions = [{
	question: "Wilt Chamberlain once scored 100 points in a game. Which player has the second-highest total points in a single game?",
	answerList: ["Kobe Bryant", "Lebron James", "Kareem Abdul Jabbar"],
	answer: 0
},{
	question: "How long is a regulation NBA game?",
	answerList: ["40", "48", "60"],
	answer: 1
},{
	question: "How many seconds does an NBA team get to shoot?",
	answerList: ["10", "24", "30"],
	answer: 1
},{
	question: "Which of these players has a father who also played in the NBA?",
	answerList: ["Lebron James", "Kristap Porzingis", "Steph Curry"],
	answer: 2
},{
	question: "Which NBA team has won the most titles?",
	answerList: ["LA Lakers", "Boston Celtics", "San Antonio Spurs", "Chicago Bulls"],
	answer: 1
},{
	question: "What former player was the inspiration for the NBA logo?",
	answerList: ["Wilt Chamberlain", "Jerry West", "Michael Jordan", "Elgin Baylor"],
	answer: 1
},{
	question: "Which of these players went straight to the NBA from high school?",
	answerList: ["Kevin Durant", "Carmelo Anthony", "John Wall", "Monta Ellis"],
	answer: 3
},{
	question: "What were the New Orleans Pelicans previously called?",
	answerList: ["Bullets", "Royals", "Hornets"],
	answer: 2
},{
	question: "What former NBA player became famous for marketing a brand of $15 sneakers?",
	answerList: ["Michael Jordan", "Stephon Marbury", "Shaquille O'Neal", "Charles Barkley"],
	answer: 1
},{
	question: "How long can a defensive player stay in the key area if he is not guarding an opponent?",
	answerList: ["1 second", "24 seconds", "8 seconds", "3 seconds"],
	answer: 3
},{
	question: "What manufacturer makes the official NBA game ball?",
	answerList: ["Spalding", "And 1", "Wilson", "Nike"],
	answer: 0
},{
	question: "Who is the youngest player to score 25,000 points in his career?",
	answerList: ["Shaquille O'Neal", "Dirk Nowitzki", "Lebron James", "Kobe Bryant"],
	answer: 2
},{
	question: "Who won the highest-scoring NBA game ever?",
	answerList: ["LA Clippers", "Detroit Pistons", "Dallas Mavericks", "New York Knicks"],
	answer: 1
},{
	question: "How long is an NBA overtime period?",
	answerList: ["5 minutes", "10 minutes", "2 minutes"],
	answer: 0
},{
	question: "Who was the first foreign-born NBA player to become league MVP?",
	answerList: ["Toni Kukoc", "Pau Gasol", "Dirk Nowitzki", "Tim Duncan"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "In the Zone!",
	incorrect: "Airrr Balll.",
	endTime: "Shot Clock Violation!",
	finished: "And the final score is..."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}