let form = document.querySelector("form").addEventListener("submit", (e)=>{e.preventDefault();})




let Submit_Search_value = document.getElementById("Hight2");
Submit_Search_value.addEventListener("click", getSearch_Value);
let Song_Name="";
let Search_History;
let Song_Name_History=[];
let History_Arry;
let Search_value = document.getElementById("Hight");
let Saves = document.querySelector("#Saves");
let URL_LINK=[];
let Top_Songs="fun";
let main = document.querySelector("#main");
let Container_Song_Name;
let NEW_history_Arry = [];
Creat_Saves();
Chack_L_S();
Music_Api();
function Home_Cards() {
  
    
    setTimeout(() => {
      (function All_Songs_Show_Home() {
        let Child_Card="";
          URL_LINK.forEach((elm, index)=>{
           // console.log(elm["SONG_NAME"], elm["SONG_ALBUM_COVER"], elm["SONG_LINK"] , index);
              Child_Card += `
                            <article class="Card">
                               <img class="Card_img" src="https://i.scdn.co/image/ab67616d0000b27357de8cb9bbbe22a9e71c8af7" href="${elm["SONG_LINK"]}" alt="">
                                 <a href="${elm["SONG_LINK"]}" class="Card_play_btn button">play</a>
                                 <div class="Card_Title">${elm["SONG_NAME"]}</div>
                                 <div class="Card_Save_btn button" id="${index}" onclick="Save_History(this.id)">Save</div>
                            </article>
                            `
          })
          main.innerHTML += Child_Card;
      })();
    
    }, 6000);
      
  


};
Home_Cards();

function getSearch_Value() {

 ((Search_value.value==="" ) && (Search_value.value === null))? console.error("EmtyValue") : Song_Name = Search_value.value;
    Search_History={ 
        Song_Name,
    }
    Song_Name_History.push(Search_History)
    Search_value.value = null;
    console.log(Song_Name);
    // console.log(Song_Name_History);
    Chack_L_S();
    
    Music_Api(Song_Name)
    console.log(URL_LINK);
    URL_LINK.splice(0, 51)
    setTimeout(() => {
      console.log("HOME_CARD");
      
      main.innerHTML=null;
      Home_Cards();
    }, 7000);
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




//=====================// Music    //tracks
function Music_Api(Value) {
  
  if (Value===undefined) {
    Value="fun";
  } else {
    Value=Value;
  }

console.log(Value);
const Music = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '80878a924amshac9807be2633669p16bf90jsn7b32fc7488bc',
    'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
  }
};
// fetch(`https://spotify23.p.rapidapi.com/search/?q=${Value}&type=multi&offset=0&limit=50&numberOfTopResults=5`, Music)
fetch(`https://spotify81.p.rapidapi.com/search?q=${Value}&type=multi&offset=0&limit=50&numberOfTopResults=5`, Music)
  .then(response => response.json())
  .then(response => {
            //console.log(response);
                // console.log(response.tracks);
                for (let key in response.tracks) {
                  let TRACKS= response.tracks[key] ;
                  
                  for (let key2 in TRACKS) {

                   let TRACKS2 = TRACKS[key2]; 
                    console.log(TRACKS2);
                     // for (let key3 in TRACKS2) {
                        console.log(TRACKS2);
                           let artist_Arry=(TRACKS2.artists["items"]);
                           let album_Arry=(TRACKS2.albumOfTrack["name"]);
                           let song_Duration_Milliseconds=(TRACKS2.duration["totalMilliseconds"]);
                           let song_Duration_Minutes = Number((song_Duration_Milliseconds / 60000).toFixed(2));
                           let song_album_cover = (TRACKS2.albumOfTrack["coverArt"].sources[1]);
                           
                          
                             let SONGS={ 
                                      SONG_LINK: TRACKS2.uri,
                                      SONG_NAME: TRACKS2.name,
                                      SONG_DURATION: song_Duration_Minutes,
                                      SONG_ARTIST_LINK: artist_Arry[0].uri,
                                      SONG_ARTIST_NAME:artist_Arry[0].profile["name"],
                                      SONG_ALBUM_LINK: TRACKS2.albumOfTrack["uri"],
                                      SONG_ALBUM_NAME: TRACKS2.albumOfTrack["name"],
                                      SONG_ALBUM_COVER: song_album_cover,
                                    }
                                  
                                    URL_LINK.push(SONGS); 
                                    
                              
                          
                      // }

                  } 

                }

   }
  )

//=====================// END Music                           


  .catch(err => console.error(err));  // Last Line OF Music

  };

function Save_History(index) {
    let index_Elm = document.getElementById(`${index}`);
     let index_Perent = index_Elm.parentElement;
    
    let index_Title = index_Elm.parentElement.childNodes[5];
    let index_Title_innerHTML= index_Title.innerHTML;

   
   
    
    console.log(index_Perent);
    console.log(index_Title_innerHTML);

    
  

    History_Arry.push(index_Title_innerHTML);
  localStorage.setItem("History", JSON.stringify(History_Arry));
 
  Saves.innerHTML=null;
  
  Creat_Saves()
}

function Creat_Saves() {
  
  NEW_history_Arry= JSON.parse(localStorage.getItem("History"));

  console.log(NEW_history_Arry);
  if (NEW_history_Arry !== null) {
    
    let INSIDE_Saves="";
    NEW_history_Arry.forEach((element, index)=> {
      INSIDE_Saves+=`
    <div class="H_Div"> <h5 class="H_Value">${element}</h5> <div class="Delete_Btn" id="${index}" onclick="Delete_History(this.id)">X</div></div>
    `;
    });
  
    Saves.innerHTML+=INSIDE_Saves;
  }

}
// with History_Arry we wil creart the elements in Saves and give them the id of thire number in Arry like 0:,1: ;


// index will be used to get the elemenmts ID from html when clicked on delete 
// exm: onclick="Delete_History(this.id)"
function Delete_History(index) {
  
History_Arry.splice(index, 1);
 console.log(History_Arry) ;
 localStorage.setItem("History", JSON.stringify(History_Arry));

 return History_Arry;
}

// SHow HOME SHow SAVES

let  HOME = document.querySelector("#HOME");
let  SAVE = document.querySelector("#SAVE");
//let main2 = document.getElementById("main");
//let Saves2 = document.getElementById("Saves");

HOME.onclick = ()=>{
    main.style.display="grid";

    Saves.style.display="none"; //flex
}
SAVE.onclick = ()=>{
    
    main.style.display="none"; //grid
    Saves.style.display="flex"; //flex
    
}