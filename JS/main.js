//Questions Array
const questions = [
    {question: 'Enter Your First Name'},
    {question: 'Enter Your Last Name'},
    {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/}, //pattern provides email validation.
    {question: 'Enter Your Password', type: 'password'}
];

//Transition Times
const shakeTime = 100; //Shake Transition Time
const switchTime = 200; //Transition between questions

//Init Position at First Question
let position = 0;

//Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//FUNCTIONS
    
    //Gets questions from above array and adds it to the markup.
function getQuestion() {
    //Get Current Question
    inputLabel.innerHTML = questions[position].question;
    //Get Current Type
    inputField.type = questions[position].type || 'text';
    //Get Current Answer
    inputField.value = questions[position].answer || '';
    //Focus on Element
    inputField.focus();
    //Set Progress Bar Width - Variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';
    //Add user Icon or Back Arrow depending on Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

    //Display Question to User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

    //Hide Question from user
function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

    // Validate Field
function validate(){
    //Make sure patterns matches if there is one.
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    }else {
        inputPass();
    }
}

    //Transform to create shake motion.
function transform(x,y){
    formBox.style.transform = `translate(${x}px,${y}px)`;
}

    //Field Input Fail
function inputFail(){
    formBox.className = 'error';
    //Repeat Shake Motion - set i to number of shakes
    for(let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

    //Field Input Passed
function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //Store answer in array.
    questions[position].answer = inputField.value;

    //increment position.
    position++;

    //If new question, hide current question and get next question.
    if(questions[position]) {
       hideQuestion();
       getQuestion(); 
    }else {
        //Remove if there are no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%'

        //form complete
        formComplete();
    }
}

    //All Fields Complete show following when form closes. 
function formComplete(){
    const h2 = document.createElement('h2');
    h2.classList.add('end');
    h2.appendChild(document.createTextNode(`Thanks ${questions[0].answer} for registering, you will receive an email confirmation shortly.`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h2);
        setTimeout(() => h2.style.opacity = 1, 50);
    }, 1000);
}

//EVENTS
    //Get question when DOM loads.
document.addEventListener('DOMContentLoaded', getQuestion());

    //Next Button Click.
nextBtn.addEventListener('click', validate);

    //Input field enter click
inputField.addEventListener('keydown', e => {
    if(e.keyCode == 13){
        validate();
    }
});






