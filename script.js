const questions = [
  {
    question: "Quelle est la période du Hacktoberfest durant l'annee ?",
    options: ["Octobre", "Décembre", "Mai", "Août"],
    correctAnswer: 0,
    time:30
  },
  {
    question: "Où pouvez-vous contribuer pour participer au Hacktoberfest ?",
    options: ["AWS", "Facebook", "GitHub", "DigitaOcean"],
    correctAnswer: 2,
    time:20
  },
  {
    question:
      "Combien de contributions sont nécessaires pour valider le Hacktoberfest ?",
    options: ["10", "2", "6", "4"],
    correctAnswer: 3,
    time:10
  },
  {
    question: "Est-ce ce que GitLab participe au Hacktoberfest ?",
    options: ["Oui", "Non"],
    correctAnswer: 0,
    time:10
  },
];

let currentQuestion = 0;
let score = 0;
let time=0;
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const spanTimer=document.getElementById("timer");
function handleTime(time){
  let temp=time;
  const interval=setInterval(()=>{
    if(temp==0 && (currentQuestion < questions.length))
    {

      clearInterval(interval);
      currentQuestion++;
      loadQuestion();
    }
    spanTimer.innerHTML=temp--;
  },1000)
  return interval;
}
function loadQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";

  const interval=handleTime(question.time)
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      checkAnswer(index);
      clearInterval(interval);
    });
    optionsElement.appendChild(li);
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestion];

  if (selectedIndex === question.correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionElement.textContent = "Quiz terminé ! Votre score :";
    optionsElement.innerHTML = "";
    scoreElement.textContent = score;
    spanTimer.parentElement.hidden=true;
  }
}

loadQuestion();
