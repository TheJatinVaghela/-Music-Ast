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
let Top_Songs="Top-Songs";
Chack_L_S();

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
    Music_Api();
    console.log(URL_LINK);
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
function Music_Api() {
  
let Container_Song_Name;
(Song_Name==='')? Container_Song_Name=Top_Songs : Container_Song_Name=Song_Name;
//console.log(Container_Song_Name);

const Music = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '80878a924amshac9807be2633669p16bf90jsn7b32fc7488bc',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};
fetch(`https://spotify23.p.rapidapi.com/search/?q=${Container_Song_Name}&type=multi&offset=0&limit=50&numberOfTopResults=5`, Music)
  .then(response => response.json())
  .then(response => {
            console.log(response);
                // console.log(response.tracks);
                for (let key in response.tracks) {
                  let TRACKS= response.tracks[key] ;

                  for (let key2 in TRACKS) {

                   let TRACKS2 = TRACKS[key2]; 
                       for (let key3 in TRACKS2) {
                        console.log(TRACKS2[key3]);
                           let artist_Arry=(TRACKS2[key3].artists["items"]);
                           let album_Arry=(TRACKS2[key3].albumOfTrack["name"]);
                           let song_Duration_Milliseconds=(TRACKS2[key3].duration["totalMilliseconds"]);
                           let song_Duration_Minutes = Number((song_Duration_Milliseconds / 60000).toFixed(2));
                           let song_album_cover = (TRACKS2[key3].albumOfTrack["coverArt"].sources);
                           
                          
                             let SONGS={ 
                                      SONG_LINK: TRACKS2[key3].uri,
                                      SONG_NAME: TRACKS2[key3].name,
                                      SONG_DURATION: song_Duration_Minutes,
                                      SONG_ARTIST_LINK: artist_Arry[0].uri,
                                      SONG_ARTIST_NAME:artist_Arry[0].profile["name"],
                                      SONG_ALBUM_LINK: TRACKS2[key3].albumOfTrack["uri"],
                                      SONG_ALBUM_NAME: TRACKS2[key3].albumOfTrack["name"],
                                      SONG_ALBUM_COVER: song_album_cover,
                                    }
                                    URL_LINK.push(SONGS); 
                        
                          
                       }

                  }

                }

   }
   )

//=====================// END Music                           


  .catch(err => console.error(err));  // Last Line OF Music

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

