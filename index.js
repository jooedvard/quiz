window.onload = function () {
  let start = document.querySelector(".start");
  start.onclick = function (e) {
    let point = 0;
    let totalpoint;

    let bar = document.querySelector(".bar");
    let correct = document.querySelector(".correct-answers");
    e.preventDefault();
    let questions = new Questions(bar);
    questions.fetchQuestion().then(() => {
      totalpoint = questions.all;
    });

    window.addEventListener("answering", (event) => {
      event.detail.questionAnswers.forEach((event) => {
        point += event.point;
        event.node.onclick = () => {
          event.node.cloneNode(true);
        };
      });
      console.log(totalpoint);
      console.log(point);
      let barwidth = (100 / totalpoint) * point;
      bar.style.width = barwidth + "%";
      console.log(barwidth + "%");
      correct.textContent = point;
    });
  };
};

class Questions {
  constructor(progressbar) {
    this.bar = progressbar;
    this.all = 0;
  }

  async fetchQuestion() {
    this.bar.style.width = 0.5 + "px";
    document.querySelector(".correct-answers").textContent = 0;
    let questionnumber = document.querySelector("#question-numbers").value;

    const myNode = document.querySelector(".main");
    myNode.innerHTML = "";

    let response = await fetch(
      "https://the-trivia-api.com/api/questions?limit=" + questionnumber
    );
    let data = await response.json();

    this.questions = this.seperateCategories(data);
    this.makeQuestions();
  }

  seperateCategories(data) {
    let questions = {};
    data.forEach((element) => {
      if (questions.hasOwnProperty(element.category)) {
        questions[element.category].push(element);
      } else {
        questions[element.category] = [element];
      }
    });
    return questions;
  }

  makeQuestions() {
    for (const category in this.questions) {
      this.buildCategoryBlock(category, this.questions[category]);
    }
  }

  buildCategoryBlock(category, categories) {
    let body = document.querySelector(".main");
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    div.classList.add("categories");
    div.append(h4);
    h4.textContent = category + " " + "(" + categories.length + ")";
    body.append(div);

    categories.forEach((question) => {
      this.all += 1;
      let newQuestion = new Question(question, div).buildQuestion();
      div.append(newQuestion);
    });
  }
}

class Question {
  constructor(data, parent) {
    this.data = data;
    this.parent = parent;
    this.questionAnswers = [];
    this.difficulty = this.data.difficulty;
  }

  buildQuestion() {
    let div = document.createElement("div");
    let badge = document.createElement("div");
    let questionGrid = document.createElement("div");
    let titleGrid = document.createElement('div');
    let h5 = document.createElement("h5");
    this.node = div;
    this.questionGrid = questionGrid;
    h5.textContent = this.data.question;

    titleGrid.append(h5);
    titleGrid.append(badge)
    this.node.append(titleGrid);
    this.node.append(questionGrid);

    titleGrid.classList.add("title-grid");
    badge.classList.add(this.difficulty);
    this.questionGrid.classList.add("answers");
    this.node.classList.add("question");
    
    

    this.shuffleAnswers();

    return div;
  }

  shuffleAnswers() {
    let { correctAnswer, incorrectAnswers } = this.data;
    this.answers = [...incorrectAnswers, correctAnswer];
    this.answers.sort(() => {
      return Math.random() - 0.5;
    });
    this.answers.forEach((answer) => {
      this.questionAnswers.push(
        new QuestionAnswer(answer, this.questionGrid, correctAnswer)
      );
    });

    this.questionAnswers.forEach((element) => {
      element.node.onclick = () => {
        element.checkAnswer();
        let event = new CustomEvent("answering", { detail: this });
        window.dispatchEvent(event);
      };
    });
  }
}

class QuestionAnswer {
  constructor(answer, parent, correct) {
    this.answer = answer;
    this.parent = parent;
    this.correct = correct;
    this.point = 0;
    this.appendQuestionToParent();
  }

  appendQuestionToParent() {
    let div = document.createElement("div");
    div.classList.add("answer");
    div.textContent = this.answer;
    this.parent.append(div);
    this.node = div;
  }

  checkAnswer() {
    this.node.classList.add("signed");
    if (this.answer == this.correct) {
      this.point = 1;
      setInterval(() => {
        this.node.classList.add("correct");
      }, 500);
    } else {
      setInterval(() => {
        this.node.classList.add("incorrect");
      }, 500);
    }
  }
}
