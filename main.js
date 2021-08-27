// MAIN QUESTIONS ADDED (add_ques_section)
let subjectAdded = document.getElementById("subject_name");
let questionAdded = document.getElementById("write_ques");
let submit_ques_btn = document.getElementById("submit_ques");

// DISPLAY THE MAIN QUESTIONS (display_ques_added)
let displayQn = document.getElementById("display_ques_added");
let parentDiv = document.createElement("div");
parentDiv.classList.add("parentDiv");
let selectedQuestion = document.getElementById("selected_question");

// RESPONSES ADDED (add_response_section)
let responseSection = document.getElementById("display_responses");
let responderName = document.getElementById("nameOfResponder");
let responderComment = document.getElementById("commentOfResponder");
let submit_response_btn = document.getElementById("submit_response");

// MAIN ARRAY
let MAIN_ARRAY = [];
getLocalStorage();

var commentObject;

var idCount = 0;
localStorage.setItem("id",JSON.stringify(idCount));

var index;
var appended = false;

submit_ques_btn.addEventListener("click", (event) => {
    
    idCount = JSON.parse(localStorage.getItem("id"));
    console.log(idCount);

    if (subjectAdded.value !== "" && questionAdded.value !== "") {
        
        var subQuesObject = {
            subjectAdded: subjectAdded.value,
            questionAdded: questionAdded.value,
            id: idCount,
            comments: []
        }    
        
        setLocalStorage(subQuesObject);
        
        appendParentDivToDOM(subQuesObject);

        subjectAdded.value = "";
        questionAdded.value = "";

        idCount++;
        localStorage.setItem("id",JSON.stringify(idCount));
    }
    
});
function appendParentDivToDOM(arrObject) {

    idCount = localStorage.getItem("id");
    
    var childDiv = document.createElement("div");
    childDiv.classList.add("childDiv");
    childDiv.id = idCount;
    // console.log(childDiv.id);
    
    let subjectH2 = document.createElement("h2");
    subjectH2.innerText = arrObject.subjectAdded;
    subjectH2.classList.add("subjectH2");
    childDiv.appendChild(subjectH2);
    
    let questionP = document.createElement("p");
    questionP.innerText = arrObject.questionAdded;
    questionP.classList.add("questionP");
    childDiv.appendChild(questionP);
    
    parentDiv.appendChild(childDiv);
    displayQn.appendChild(parentDiv);
    
}

parentDiv.addEventListener("click", (event) => {

    document.querySelector(".add_ques_section").style.display = "none";
    document.querySelector(".add_response_section").style.display = "initial";

    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));

    while (selectedQuestion.firstChild) {
       selectedQuestion.removeChild(selectedQuestion.lastChild);
    }

    idCount = localStorage.getItem("id");

    let selectedQuesToDisplay = document.createElement("div");
    selectedQuesToDisplay.id = idCount;
    console.log(selectedQuesToDisplay);

    console.log(event.target.parentNode);

    let subjectH2 = document.createElement("h2");
    subjectH2.innerText = MAIN_ARRAY[event.target.parentNode.id].subjectAdded;
    subjectH2.classList.add("subjectH2");
    selectedQuesToDisplay.appendChild(subjectH2);

    let questionP = document.createElement("p");
    questionP.innerText = MAIN_ARRAY[event.target.parentNode.id].questionAdded;
    questionP.classList.add("questionP");
    selectedQuesToDisplay.appendChild(questionP);

    selectedQuestion.appendChild(selectedQuesToDisplay);
    console.log(selectedQuestion);

    // index = event.target.parentNode.id;

    console.log(idCount);

    showResponsesInDOM(idCount);

});


submit_response_btn.addEventListener("click",(event)=>{
    let rpName = responderName.value;
    let rpComment = responderComment.value;
    console.log(rpName);
    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));

    let comment = {
        name : rpName,
        comment : rpComment
    }
    MAIN_ARRAY[index].comments.push(comment);

    localStorage.setItem("questionsArr",JSON.stringify(MAIN_ARRAY));
    
    responderName.value = "";
    responderComment.value = "";
    
    appendResponsesToDOM(comment);

});

function showResponsesInDOM(index) {

    console.log(responseSection);
    if(responseSection.innerHTML){
        responseSection.innerHTML = "";
    }

    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));
    idCount =  JSON.parse(localStorage.getItem("id"));

    console.log(MAIN_ARRAY[idCount]);

    MAIN_ARRAY[idCount].comments.forEach(commentArr => {

        var container = document.createElement("div");
        container.classList.add("responses");
        let name = document.createElement("h3");
        name.innerText = commentArr.name;
        let comment = document.createElement("p");
        comment.innerText = commentArr.comment;

        container.appendChild(name);
        container.appendChild(comment);
        responseSection.appendChild(container);

    });    
}

function appendResponsesToDOM(commentArr) {

    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));
    if(commentArr.name && commentArr.comment){

        // MAIN_ARRAY[index].comments.forEach(commentArr => {
            let container = document.createElement("div");
            container.classList.add("responses");
            let name = document.createElement("h3");
            name.innerText = commentArr.name;
            let comment = document.createElement("p");
            comment.innerText = commentArr.comment;

            container.appendChild(name);
            container.appendChild(comment);
            responseSection.appendChild(container);
        // });
    }
    
}


function setLocalStorage(subQuesObject) {
    
    if (localStorage.getItem("questionsArr") == null) {
        var MAIN_ARRAY = [];
    } else {
        MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));
    }
    // console.log(MAIN_ARRAY);   
    
    MAIN_ARRAY.push(subQuesObject);

    console.log(MAIN_ARRAY);

    localStorage.setItem("questionsArr", JSON.stringify(MAIN_ARRAY));

}

function getLocalStorage() {

    if (localStorage.getItem("questionsArr") === null) {
        var MAIN_ARRAY = [];
    } else {
        MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));
    }

    // console.log(MAIN_ARRAY);

    MAIN_ARRAY.forEach((arrObject) => {
        // console.log("arrObj : ", arrObject);
        appendParentDivToDOM(arrObject);
    });

}