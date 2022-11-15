const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalbody = document.getElementById('modal-body-confirm')
const startBtn = document.getElementById('start-button')
const url = window.location.href

modalBtns.forEach( modalBtn=>modalBtn.addEventListener ('click', ()=> {
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-exam')
    const questions = modalBtn.getAttribute('data-question')
    const ScoreToPass = modalBtn.getAttribute('data-pass')
    const time = modalBtn.getAttribute('data-time')

    modalbody.innerHTML=`
         <div class='h5 mb-3 '> Are you ready to begin <b>${name}</b> exam?<br>
         <div class='text-muted'>
            <ul><br>                
                <li>Number of questions: ${questions}</li>
                <li>Score to pass: ${ScoreToPass}%</li>
                <li>Exam time: ${time} min</li>
            </ul>  
         </div>`

         startBtn.addEventListener('click', ()=>{
            window.location.href = url + pk
         })

      }));
