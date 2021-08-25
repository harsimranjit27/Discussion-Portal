// let count = 0;
let subjectAdded = document.getElementById("subject_name");
let questionAdded = document.getElementById("write_ques");
let submit = document.getElementById("submit_btn");
let displayQn = document.getElementById("display_ques_added");
let parentDiv = document.createElement("div");
parentDiv.classList.add("parentDiv");

var selectedQuestion = document.getElementById("selectedQuestion");

getLocalStorage();

submit.addEventListener("click",(event)=>{  
    
    if(subjectAdded.value !== "" && questionAdded.value !== ""){

        var subQuesObject = {
            subjectAdded : subjectAdded.value,
            questionAdded : questionAdded.value
        }
        setLocalStorage(subjectAdded.value,questionAdded.value);
        
        appendParentDivToDOM(subQuesObject);

        subjectAdded.value = "";
        questionAdded.value = "";
    }   
});


function appendParentDivToDOM(arrObject) {

    console.log(arrObject);

    var childDiv = document.createElement("div");
    childDiv.classList.add("childDiv");

    var subjectH2 = document.createElement("h2");
    subjectH2.innerText = arrObject.subjectAdded;
    subjectH2.classList.add("subjectH2");
    childDiv.appendChild(subjectH2);
    
    var questionP = document.createElement("p");
    questionP.innerText = arrObject.questionAdded;
    questionP.classList.add("questionP");
    childDiv.appendChild(questionP);

    parentDiv.appendChild(childDiv);
    displayQn.appendChild(parentDiv);  
    
}

function setLocalStorage(subjectValue,questionValue) {  
    if (localStorage.getItem("questionsArr") == null) {
        var questionsArr = [];
    }
    else{
        questionsArr = JSON.parse(localStorage.getItem("questionsArr"));
    }

    let temp = {
        subjectAdded : "",
        questionAdded : ""
    };
    temp.subjectAdded = subjectValue;
    temp.questionAdded = questionValue;
    
    questionsArr.push(temp);
    // console.log(questionsArr);   
    localStorage.setItem("questionsArr",JSON.stringify(questionsArr));
    
}

function getLocalStorage() {

    if (localStorage.getItem("questionsArr") === null) {
        var questionsArr = [];
    }
    else{   
        questionsArr = JSON.parse(localStorage.getItem("questionsArr"));
    }

    // console.log(questionsArr);
    questionsArr.forEach((arrObject) => {
        // console.log("arrObj : ",arrObject);
        appendParentDivToDOM(arrObject);
        
    });

}