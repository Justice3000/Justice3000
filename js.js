
checkStorage(); //see the function for explanation

//event listener to check if secret has been unlocked.
let secret = document.getElementById('secret');
  secret.addEventListener('click', secretF);
upBtn = document.getElementById("upBtn");


window.onscroll = function() {
  scrollFunction();
  scrollbar();

}
// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
}



function scrollbar(){
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("indicator").style.width = scrolled + "%";
}




// im leaving this big messy chunk as a reminder how NOT TO WRITE THE CODE. Just a gravestone for myself. Just go to bypass function for right example of the same thing
  function secretF(){

  let audio = new Audio('oth/drone4.mp3');
  audio.play();

 document.body.style.backdropFilter = 'blur(0px) grayscale(0%)';
  
  let card = document.getElementsByClassName('card-img');
  for (let i = 0, max = card.length; i < max; i++){
    card[i].style.opacity = "0.8"; 
    card[i].style.filter = "invert(100%)"; 
  }

    let cardText = document.getElementsByClassName('card-text');
    for (let i = 0, max = cardText.length; i < max; i++){
      cardText[i].style.filter = "blur(0px)";}

      let cardTit = document.getElementsByClassName('card-title');
    for (let i = 0, max = cardTit.length; i < max; i++){
      cardTit[i].style.filter = "blur(0px)";}

      let listG = document.getElementsByClassName('list-group-item');
    for (let i = 0, max = listG.length; i < max; i++){
      listG[i].style.filter = "blur(0px)";}
     


      let Addition = document.getElementsByClassName('card-text')[0];
      Addition.innerHTML = ('I am here to tell you that you did find the secret!');
    
      
      localStorage.clear();
      localStorage.setItem('DaniSecret',"found");
     removeBtn();
}



//very ugly and mashed function for now, because just got some tips from teacher. Shall redo code in blocks for each step.
function bypass(){
  // here im letting user to bypass secret look and just skip to it

  document.body.style.backdropFilter = 'blur(0px) grayscale(0%)'; //removing grayscale. looks like it doesnt work on mozzila

//letting user know forever if he skipped the secret
      let Addition = document.getElementsByClassName('card-text')[0];
      Addition.innerHTML = ('You skipped the secret');
//removing skip secret button setting up local storage
      let skip = document.getElementById('skipSecret');
      skip.parentNode.removeChild(skip);
      localStorage.setItem('DaniSecret',"skipped");
}



function checkStorage(){
  // im checking if user has skipped the secret
  if (localStorage.getItem('DaniSecret') == "skipped"){
    let Addition = document.getElementsByClassName('card-text')[0];
    // letting the user know that the secret is yet to be found
    Addition.innerHTML = ('You skipped the secret');
//removing secret skip button
removeBtn();
    
    //checking if the user has found the secret and removing skip secret button
  
  } else if (localStorage.getItem('DaniSecret') == "found"){
    document.body.style.backdropFilter = 'blur(0px) grayscale(0%)';
   

    let Addition = document.getElementsByClassName('card-text')[0];
    //taking away finssecret text
    Addition.innerHTML = 'But the interweb names me as Justice3000. ';
//this is yet the only method yet I've learnt from WU2020
removeBtn();
  }
}


// When the user clicks on the button, scroll to the top of the document. I don't know any alternatives yet. Will remake it into smooth scroll dough.
function goUp() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


  function music(){
    let audio = new Audio('oth/drone4.mp3'); //locating music
  audio.play();//playing it
  }


//seems like im running out of time and wont be able to add unblur for my anchor links

getRepos();



function getRepos(){
  fetch('https://api.github.com/users/Justice3000/repos')
  .then(response=> response.json())
  .then(data=>{
    sorting();
    function sorting(){
      data.sort(function(a,b){
        let keyA = a.updated_at;
        let keyB = b.updated_at;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    })
    }
    for (i=0; i<data.length; i++){
      let gitRepo = document.getElementById('reposJSON');
      gitRepo.insertAdjacentHTML('beforeend','<a href="'+data[i].html_url+'">'+data[i].name+'</a><br>');
    }
  })
}




//seems like im running out of time and wont be able to add unblur for my anchor links

function removeBtn(){
let skip = document.getElementById('skipSecret');
if (skip !== null)
skip.parentNode.removeChild(skip);
}

getWorkHistory();
function getWorkHistory(){
  fetch('workHistory.json')
  .then(response=> response.json())
  .then(data=>{
    sorting();
    function sorting(){
      data.sort(function(a,b){
        let keyA = a.updated_at;
        let keyB = b.updated_at;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    })
    }
    let workHistory = document.getElementById('tableG');
    workHistory.innerHTML = '';
    
    
    for (i=0; i<data.length; i++){
     
      workHistory.innerHTML += '<tr><td>'+data[i].yearStarted+'</td><td>'+data[i].yearEnded+'</td><td>'+data[i].titleEN+'</td><td>'+data[i].place+'</td>';
     
    }
    workHistory.insertAdjacentHTML('afterbegin','<thead><tr><th scope="col">Year Started</th><th scope="col">Year Ended</th><th scope="col">Title</th><th scope="col">Place</th></tr><thead>');
  })
}