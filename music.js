
let Submit_Search_value = document.getElementById("Hight2");
Submit_Search_value.addEventListener("click", getSearch_Value);
let Song_Name="";
let Search_History;
let Song_Name_History=[];

function getSearch_Value() {

    let Search_value = document.getElementById("Hight");
    Song_Name = Search_value.value;
    Search_History={ 
        Song_Name,
    }
    Song_Name_History.push(Search_History)
    Search_value.value = null;
    
    console.log(Song_Name);
    console.log(Song_Name_History);
};
