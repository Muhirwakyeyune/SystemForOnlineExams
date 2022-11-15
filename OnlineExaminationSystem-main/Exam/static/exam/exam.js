const url = window.location.href;
// console.log =(url)

const examBox = document.getElementById("exam-box");
const scoreBox = document.getElementById("score-box");
const resultBox = document.getElementById("result-box");
const timerBox = document.getElementById("timer-box");

const activateTimer = (time) => {
  // console.log(time)

  if (time.toString().length<2){
    timerBox.innerHTML=`<b>0${time}:00</b>`

  } else{
    timerBox.innerHTML=`<b>${time}:00</b>`

  }

  let minutes = time - 1
  // console.log(minutes)
  let seconds = 60
  let displaySeconds
  let displayMinutes

  const timer = setInterval(()=>{
     seconds --
     if (seconds<0){
       seconds=59
       minutes --
     }
     if (minutes.toString().length < 2){
       displayMinutes= '0'+ minutes
     } else{
       displayMinutes= minutes
     }
     if(seconds.toString().length <2){
       displaySeconds ='0'+ seconds
     } else {
       displaySeconds = seconds
     }
     if (minutes === 0 && seconds === 0){
       timerBox.innerHTML='<b>00:00</b>'
       setTimeout(() =>{
        clearInterval(timer)
        alert('time is over')
        sendData()
       },500)
       
     }
     timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`
  }, 1000)


}



$.ajax({
  type: "GET",
  url: `${url}data`,
  success: function (response) {
    // console.log(response)
    const data = response.data;
    data.forEach((el) => {
      for (const [question, answers] of Object.entries(el)) {
        examBox.innerHTML += `
                    <hr>
                    <div class="mb-2">
                       <b>${question}</b>
                    </div>
                `;
        answers.forEach((answer) => {
          examBox.innerHTML += `
                       <div>
                          <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
                          <label for= "${question}"> ${answer} </label>
                       </div>
                    
                    `;
        });
      }
    });
    activateTimer(response.time)


  },

  error: function (error) {
    console.log(error);
  },
});

const examForm = document.getElementById("exam-form");
const csrf = document.getElementsByName("csrfmiddlewaretoken");

const sendData = () => {
  const elements = [...document.getElementsByClassName("ans")];

  const data = {};
  data["csrfmiddlewaretoken"] = csrf[0].value;
  elements.forEach((el) => {
    if (el.checked) {
      data[el.name] = el.value;
    } else {
      if (!data[el.name]) {
        data[el.name] = null;
      }
    }
  });

  $.ajax({
    type: "POST",
    url: `${url}save/`,
    data: data,
    success: function (response) {
      // console.log(response)
      const results = response.results;
      console.log(results);
      examForm.classList.add("not-visible");

      scoreBox.innerHTML = `<h4>${response.passed ? 'conglatulations' : 'keep trying..:(   '}Your result are ${response.score.toFixed(2)}%</h4>`

      results.forEach((res) => {
        const resDiv = document.createElement("div");
        for (const [question, resp] of Object.entries(res)) {
          //  console.log(question)
          //  console.log(resp)
          //  console.log('__________________________________')

          resDiv.innerHTML += question;
          const cls = ["container", "p-3", "text-light", "h4"];
          resDiv.classList.add(...cls);

          if (resp =="not_answered") {
            resDiv.innerhtml += "not answered";
            resDiv.classList.add("bg-secondary");
          } else {
            const answer = resp["answered"];
            const correct = resp["correct_answer"];

            if (answer == correct) {
              resDiv.classList.add("bg-primary");
              resDiv.innerHTML += `<br>answered: ${answer}`;
            } else {
              resDiv.classList.add("bg-secondary");
              resDiv.innerHTML += ` <br>|correct answer: ${correct}`;
              resDiv.innerHTML += ` <br>|answered: ${answer}`;
            }
          }
        }
        // const body = document.getElementsByTagName("BODY")[0];
        resultBox.append(resDiv);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
};
examForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
  
});
