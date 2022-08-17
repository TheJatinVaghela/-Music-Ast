let form = document.querySelector("form").addEventListener("submit", (e)=>{e.preventDefault();})



let Submit_Search_value = document.getElementById("Hight2");
Submit_Search_value.addEventListener("click", getSearch_Value);
let Song_Name="";
let Search_History;
let Song_Name_History=[];

function getSearch_Value() {

    let Search_value = document.getElementById("Hight");
    if () {
        
    }
    Song_Name = Search_value.value;
    Search_History={ 
        Song_Name,
    }
    Song_Name_History.push(Search_History)
    Search_value.value = null;
    
    console.log(Song_Name);
    console.log(Song_Name_History);
    Chack_L_S();
};

function Chack_L_S() {
  let History = localStorage.getItem("History");
  let History_Arry;
  if (History===null) {
    History_Arry=[];
  } else {
    History_Arry = JSON.parse(History);
  }
  History_Arry.push(...Song_Name_History);
  
  localStorage.setItem("History", JSON.stringify(History_Arry));

  
};

