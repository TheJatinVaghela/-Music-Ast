let form = document.querySelector("form").addEventListener("submit", (e)=>{e.preventDefault();})




let Submit_Search_value = document.getElementById("Hight2");
Submit_Search_value.addEventListener("click", getSearch_Value);
let Song_Name="";
let Search_History;
let Song_Name_History=[];
let History_Arry;
let Search_value = document.getElementById("Hight");
Chack_L_S();

function getSearch_Value() {

 ((Search_value.value==="" ) && (Search_value.value === null))? console.error("EmtyValue") : Song_Name = Search_value.value;
    Search_History={ 
        Song_Name,
    }
    Song_Name_History.push(Search_History)
    Search_value.value = null;
    
   // console.log(Song_Name);
   // console.log(Song_Name_History);
    Chack_L_S();
};


function Chack_L_S() {

  let History = localStorage.getItem("History");
  if (History == null) {
    History_Arry= [];
  } else {
    History_Arry = JSON.parse(History);
  }
   console.log(History_Arry);
  //  Delete_History()
  //  console.log(History_Arry);
   (Song_Name === '')?console.log("np") : History_Arry.push(Search_History);
  localStorage.setItem("History", JSON.stringify(History_Arry));
  
};
// with History_Arry we wil creart the elements in Saves and give them the id of thire number in Arry like 0:,1: ;


// index will be used to get the elemenmts ID from html when clicked on delete 
// exm: onclick="Delete_History(this.id)"
function Delete_History(index) {
  
  History_Arry.splice(index, 1);
 console.log(History_Arry) ;
 localStorage.setItem("History", JSON.stringify(History_Arry));

 return History_Arry;
}

