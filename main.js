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
let resolve_btn = document.getElementById("resolve");
let responseSection = document.getElementById("display_responses");
let responderName = document.getElementById("nameOfResponder");
let responderComment = document.getElementById("commentOfResponder");
let submit_response_btn = document.getElementById("submit_response");

var idCount = 0;
var questionID;

data = localStorage.getItem("questionsArr");
if (data) {
    data = JSON.parse(data);
}

// MAIN ARRAY
let MAIN_ARRAY = (data || []) ;

MAIN_ARRAY.forEach((arrObject) => {
    // console.log("arrObj : ", arrObject);
    // console.log("idCount",idCount);
    appendParentDivToDOM(arrObject);
});

submit_ques_btn.addEventListener("click", (event) => {
    
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
    }
    
});
function appendParentDivToDOM(arrObject) {

    var childDiv = document.createElement("div");
    childDiv.classList.add("childDiv");
    childDiv.id = idCount;
    
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
    
    idCount++;
}

parentDiv.addEventListener("click", (event) => {
    
    document.querySelector(".add_ques_section").style.display = "none";
    document.querySelector(".add_response_section").style.display = "initial";

    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));
    
    // console.log(selectedQuestion);
    while (selectedQuestion.firstChild) {
        selectedQuestion.removeChild(selectedQuestion.lastChild);
    }
    
    let selectedQuesToDisplay = document.createElement("div");
    questionID = event.target.parentNode.id;
    // console.log("questionID",questionID);
    selectedQuesToDisplay.id = questionID;
    // console.log(selectedQuesToDisplay);

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
    
    showResponsesInDOM(event);
    
});
function showResponsesInDOM(event) {

    // console.log(responseSection);
    if(responseSection.innerHTML){
        responseSection.innerHTML = "";
    }

    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));

    console.log(MAIN_ARRAY[event.target.parentNode.id]);

    MAIN_ARRAY[event.target.parentNode.id].comments.forEach(commentArr => {

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

submit_response_btn.addEventListener("click",(event)=>{

    let rpName = responderName.value;
    let rpComment = responderComment.value;
    console.log(rpName);
    MAIN_ARRAY = JSON.parse(localStorage.getItem("questionsArr"));

    let comment = {
        name : rpName,
        comment : rpComment
    }
    MAIN_ARRAY[questionID].comments.push(comment);

    localStorage.setItem("questionsArr",JSON.stringify(MAIN_ARRAY));
    
    responderName.value = "";
    responderComment.value = "";
    
    appendResponsesToDOM(comment);

});
function appendResponsesToDOM(commentArr) {

    if(commentArr.name && commentArr.comment){

            let container = document.createElement("div");
            container.classList.add("responses");
            let name = document.createElement("h3");
            name.innerText = commentArr.name;
            let comment = document.createElement("p");
            comment.innerText = commentArr.comment;

            container.appendChild(name);
            container.appendChild(comment);
            responseSection.appendChild(container);
    }
}

resolve_btn.addEventListener("click",(event)=>{
    parentDiv.removeChild(document.getElementById(questionID));
    document.querySelector(".add_ques_section").style.display = "initial";
    document.querySelector(".add_response_section").style.display = "none";

    for (let i = questionID; i < MAIN_ARRAY.length; i++) {
        // console.log(document.getElementById(i));
        document.getElementById(i).setAttribute("id",i-1);
    }

    MAIN_ARRAY.splice(questionID,1);
    if (MAIN_ARRAY.length === 0) {
        parentDiv.style.border = "none";
        parentDiv.style.overflowY = "hidden";
    }
    localStorage.setItem("questionsArr",JSON.stringify(MAIN_ARRAY));
    
});

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