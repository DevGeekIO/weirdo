// script.js

const questions = [
    {
      question: "What’s your ideal pet?",
      inputRequired: true,
      prompt: "Type your weird pet idea:",
      answers: [
        { text: "A raccoon with emotional issues", score: 10 },
        { text: "A haunted cactus", score: 8 },
        { text: "A cloud named Barry", score: 6 },
        { text: "A sock that screams when wet", score: 12 }
      ]
    },
    {
      question: "How do you usually greet people?",
      inputRequired: true,
      prompt: "Type your weird pet idea:",
      answers: [
        { text: "High five their shadow", score: 10 },
        { text: "Scream internally and smile externally", score: 6 },
        { text: "Sniff the air like a wolf", score: 8 },
        { text: "Telepathically, duh", score: 12 }
      ]
    },
    {
      question: "Your favorite late-night snack?",
      inputRequired: true,
      prompt: "Type your weird pet idea:",
      answers: [
        { text: "Toothpaste and sadness", score: 6 },
        { text: "Raw noodles straight from the pack", score: 4 },
        { text: "Ice cubes with a splash of chaos", score: 5 },
        { text: "Whatever's glowing in the fridge", score: 7 }
      ]
    },
    {
      question: "You’re given $1 million. What do you do first?",
      inputRequired: true,
      prompt: "Type your weird pet idea:",
      answers: [
        { text: "Buy 10,000 rubber ducks", score: 4 },
        { text: "Hire someone to narrate my life", score: 5 },
        { text: "Disappear wearing only glitter", score: 6 },
        { text: "Invest in potato NFTs", score: 7 }
      ]
    },
    {
      question: "Pick a superpower:",
      inputRequired: true,
      prompt: "Type your weird pet idea:",
      answers: [
        { text: "Summon frogs at will", score: 6 },
        { text: "Speak fluent sarcasm", score: 4 },
        { text: "Invisible but only when no one looks", score: 5 },
        { text: "Instantly grow a beard", score: 3 }
      ]
    }
  ];
  
  const badAdvice = [
    "Brush your teeth with orange juice for the zing.",
    "Text your ex 'We need to talk' and turn off your phone.",
    "Join meetings late. Say nothing. Leave early.",
    "Eat cereal with a fork to save milk.",
    "Sleep under your bed. Outsmart the monsters.",
    "Replace your boss’s coffee with glitter.",
    "Invest in socks. They will rule one day.",
    "Make 'Oops' your catchphrase forever.",
    "Buy a cape. Start answering doors like a wizard.",
    "Apply for CEO positions. Manifest greatness."
  ];
  
  let currentQuestion = 0;
  let totalScore = 0;
  
  const quizContainer = document.getElementById("quiz-container");
  const nextBtn = document.getElementById("next-btn");
  const resultBox = document.getElementById("result");
  const scoreText = document.getElementById("weird-score");
  const adviceText = document.getElementById("bad-advice");
  
  function showQuestion() {
    const q = questions[currentQuestion];
    quizContainer.innerHTML = `
      <h2>${q.question}</h2>
      <ul>
        ${q.answers.map((a, i) => `
          <li>
            <button class="answer-btn" data-score="${a.score}">${a.text}</button>
          </li>`).join("")}
      </ul>
    `;
    document.querySelectorAll(".answer-btn").forEach(btn => {
      btn.addEventListener("click", selectAnswer);
    });
  }
  
  function selectAnswer(e) {
    const score = parseInt(e.target.getAttribute("data-score"));
    totalScore += score;
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quizContainer.style.display = "none";
    nextBtn.style.display = "none";
    resultBox.classList.remove("hidden");
    scoreText.textContent = `You scored: ${totalScore} weird points`;
    const advice = badAdvice[Math.floor(Math.random() * badAdvice.length)];
    adviceText.textContent = `🧠 Your bad advice: ${advice}`;

    // Add this inside showResult() at the end
document.getElementById("copy-btn").addEventListener("click", () => {
    const text = `${scoreText.textContent}\n${adviceText.textContent}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard! 📋");
    });
  });
  
  const twitterBtn = document.getElementById("twitter-share");
  const tweetText = `I scored ${totalScore} weird points 😵‍💫\n${adviceText.textContent} #WeirdQuiz #BadAdvice`;
  const encoded = encodeURIComponent(tweetText);
  twitterBtn.href = `https://twitter.com/intent/tweet?text=${encoded}`;

  const whatsappBtn = document.createElement("button");
whatsappBtn.textContent = "📲 Share on WhatsApp";
whatsappBtn.onclick = function() {
  const shareText = `${scoreText.textContent} \n${adviceText.textContent}\nCheck out your weird score at: www.your-website.com`;
  window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
};
document.querySelector(".share-buttons").appendChild(whatsappBtn);

const instagramBtn = document.createElement("button");
instagramBtn.textContent = "📸 Share on Instagram";
instagramBtn.onclick = function() {
  html2canvas(document.body).then(function(canvas) {
    const imageData = canvas.toDataURL("image/png");
    // Now use this image to upload/share on Instagram through APIs (this requires a backend)
  });
};
document.querySelector(".share-buttons").appendChild(instagramBtn);

  
}

const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
leaderboard.push({ name: "User", score: totalScore });
leaderboard.sort((a, b) => b.score - a.score); // Sort by highest score
localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

// Display leaderboard
function showLeaderboard() {
  let leaderboardHtml = "<h2>Top 50 Weirdos</h2><ol>";
  leaderboard.slice(0, 50).forEach((entry, i) => {
    leaderboardHtml += `<li>${i + 1}. ${entry.name}: ${entry.score}</li>`;
  });
  leaderboardHtml += "</ol>";
  document.getElementById("quiz-container").innerHTML = leaderboardHtml;
}

  
  showQuestion();

  