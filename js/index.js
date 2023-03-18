
$(document).ready(function(){
   $('.loading').fadeOut(1000 , function(){
      $("body").css("overflow", "visible");
      $('.loading').remove();
   });
})
// ----------------------
var nav_left_width =$('.nav-left').outerWidth();
$('.both').click(function(){
   if($('.side-nav').css('left')=='0px')
   {
      $('.side-nav').animate({left: -nav_left_width}, 500);
      $('.both').addClass('fa-bars');
      $('.both').removeClass('fa-xmark');
      $(".link-nav").animate({
         top: 400
     }, 500)
   }
   else{
   $('.side-nav').animate({left: 0} , 500);
   $('.both').removeClass('fa-bars');
   $('.both').addClass('fa-xmark');
   $(".link-nav").animate({
      top: 0
  }, 500)
   }

})
// ---------------------------------------------------------------------------

function displayMeal(mail)
{
  var cartona=``;
   for(var i=0 ; i<mail.length ; i++ )
   {
      cartona +=`<div class="col-md-3 bb ">
      <div class="item rounded-2" id='${mail[i].idMeal}'>
          <img class="img1 w-100" src="${mail[i].strMealThumb}" alt="">
          <div class="item-layer p-2">
              <h3 class="layer-h fs-3">${mail[i].strMeal}</h3>
          </div>
      </div>

  </div>`
  
   }
   document.getElementById('datamail').innerHTML=cartona;
   movedetail();
   getid();
   move();
   moves();
   moveint();
}
function movedetail(){
   $('.item').click(function(){
      
      console.log('iiiiu');
      $('.start').addClass('d-none');
      // $('.details').removeClass('d-none').addClass('d-block');
      
      
     
   })}
async function getMail(meal)
{
   var getresponce =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
   var result =await getresponce.json();
   console.log(result);
   
   // result.meals ? displayMeal(result.meals) : displayMeal([]);
   // searchname();

   // searchinput();
   displayMeal(result.meals);
   
}
getMail('');

// -----------------------------------------------------------------
function detailMail(meal)
{
   let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="rounded-2  m-2 p-1" style="background-color: #cff4fc; color:#055160;">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

   var cartona2= `<div class="col-md-4">
   <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
   
       <h2 class="text-white">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
   <h2 class="text-white">Instructions</h2>
   <p class="text-white">${meal.strInstructions}</p>
   <h3 class="text-white"><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
   <h3 class="text-white"><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
   <h3 class="text-white">Recipes :</h3>
   <ul class="list-detail d-flex g-3 flex-wrap">
   ${ingredients}
   </ul>

   <h3 class="text-white">Tags :</h3>
   <ul class="list-unstyled d-flex g-3 flex-wrap">
       
   ${tagsStr}
   </ul>

   <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
   <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
</div>`
document.getElementById('detailsdata').innerHTML=cartona2;

}


async  function getDetail(id)

{
   $('.loading2').fadeOut(1000);
   var responce2= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   var result2=await responce2.json();
   console.log(result2);
   console.log(result2.meals[0].strMealThumb);
   detailMail(result2.meals[0]);
   $('.loading2').remove();
   
   
}


function getid()
{
    var idd =document.querySelectorAll('.item');
    for(let numItem of idd)
    {
        numItem.addEventListener('click' , function(e)
            {
                var cc = numItem.getAttribute('id');
                $('.search-sec ').removeClass('d-block').addClass('d-none');
                getDetail(cc);
                
            })
    }

};
// -------------------------------------------
function searchname()
{
   var cartona3=` <div class="row py-4 ">
   <div class="col-md-6 ">
       <input class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" id="input1">
   </div>
   <div class="col-md-6">
       <input class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter " maxlength="1" id='input2'>
   </div>
</div>`
document.getElementById('byname').innerHTML=cartona3;
console.log('ccccccccccccc');
eventsear();
eventsear2();

}
searchname();
function eventsear()
{
  $('#input1').keyup(function(){
   var val = $('#input1').val();
   console.log(val);
   searchName(val);
   $('.start').removeClass('d-none').addClass('d-block');
  })
}

async function searchName(term) {
   
   // $('.loading2').fadeOut(1000);
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response = await response.json();
   console.log(response.meals);
   response.meals ? displayMeal (response.meals) : displayMeal ([]);
   console.log('wwwwwww');   

}

async function searchfirst(term) {
   
   // $('.loading2').fadeOut(1000);
   if(term=="")
   {

      term='a';
   }
  
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response = await response.json();
   console.log(response.meals);
   response.meals ? displayMeal (response.meals) : displayMeal ([]);
   console.log('wwwwwww');   
   
   

}
function eventsear2()
{
  $('#input2').keyup(function(){
   var val = $('#input2').val();
   console.log(val);
   searchfirst(val);
   $('.start').removeClass('d-none').addClass('d-block');
  })
}


// ------------------------------------------------------------
function categoryDisplay(cat)
{
      var cartona4=``;
      for(var i=0; i<cat.length;i++)
      {
         cartona4+=`<div class="col-md-3">
         <div class="item rounded-2 " id=${cat[i].strCategory}>
             <img class=" img1 w-100" src="${cat[i].strCategoryThumb}" alt="">
             <div class="item-layer2 p-2 text-center">
                 <h3 class="layer-h fs-3">${cat[i].strCategory}</h3>
                 <p>${cat[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
             </div>
         </div>

     </div>`
      }
      document.getElementById('cat-dis').innerHTML=cartona4;
      getc();
      
      // getcat();
}

async function catData()
{
   var catRes= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   var result4 = await catRes.json();
   console.log("llll" , result4);
   categoryDisplay(result4.categories);


}
// catData();

async function catMeal(uu)
{
   console.log('uuuu' ,uu);
   var cat_mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${uu}`);
   var result5 = await cat_mealRes.json();
   console.log('gg',result5.meals);
   displayMeal(result5.meals.slice(0, 20));
   // $('.loading2').remove();
   
}
function getc()
{
    var idd =document.querySelectorAll('.item');
    for(let numItem of idd)
    {
        numItem.addEventListener('click' , function(e)
            {
               var ss = numItem.getAttribute('id');
                catMeal(ss);
                  $('.loading2').remove();
                  // $('.details').removeClass('d-block').addClass('d-none');
                  // $('.start').removeClass('.d-none').addClass('d.block');
            })
    }

};


function move(){
   $('.item').click(function(){
      
      console.log('iiiiu');
      $('.loading2').remove();
      $('.category').addClass('d-none');
      $('.item').addClass('d-none');
      $('.details').removeClass('d-none').addClass('d-block');
      $('.start').removeClass('d-none').addClass('d-block');
   })}



// ------------------------------------------------------

function displayarea(arr)
{
  var cartona6=``;
  for(var i=0 ;i<arr.length ;i++)
  {
   cartona6 +=`<div class="col-md-3 ">
   <div class="area-item rounded-2 text-white" id='${arr[i].strArea}'>
       <i class="fa-solid fa-house-laptop fa-4x"></i>
       <h3>${arr[i].strArea}</h3>
</div>
</div>`
  }
  document.getElementById('area-dis').innerHTML=cartona6;
  geta();
  
}


async function getarea()
{
   var arearesp= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   var result6= await arearesp.json();
   console.log('fff',result6.meals);
   displayarea(result6.meals);
   
}
// getarea();


async function areafilter(aree)
{
   console.log(aree);
   var respfilter = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${aree}`);
   var result66 =await respfilter.json();
   console.log(result66);
   displayMeal(result66.meals.slice(0, 20));

}
function geta()
{
    var idd =document.querySelectorAll('.area-item');
    for(let numItem of idd)
    {
        numItem.addEventListener('click' , function(e)
            {
               var ss = numItem.getAttribute('id');
                areafilter(ss);
                  $('.loading2').remove();
                  // $('.start').removeClass('.d-none').addClass('d.block');
            })
    }

};


function moves(){
   $('.area-item').click(function(){
      
      console.log('iiiiu');
      $('.loading2').remove();
      $('.area').addClass('d-none');
      $('.area-item').addClass('d-none');
      $('.start').removeClass('d-none').addClass('d-block');
   })}

   // -------------------------------------------
   function displayint(arr)
{
   console.log(arr);
  var cartona7=``;
  
  for(var i=0 ;i<arr.length ;i++)
  
  {
   cartona7 +=`
   <div class="col-md-3">
   <div class=" integrate-item rounded-2 text-white" id='${arr[i].strIngredient}'>
       <i class="fa-solid fa-drumstick-bite fa-4x"></i>
       <h3>${arr[i].strIngredient}</h3>
       <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
      
</div>


</div>`
  }
  document.getElementById('int').innerHTML=cartona7;
geti();
  
}

async function getint()
{
   var intresp= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
   var result7= await intresp.json();
   console.log('fff',result7.meals);
   displayint(result7.meals.slice(0, 20));
}
// getint();

async function intfilter(inte)
 {    
   // $('.loading3').fadeOut(300);
   console.log(inte);
   var respfilter = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inte}`);
   var result77 =await respfilter.json();
   console.log(result77);
   displayMeal(result77.meals.slice(0, 20));
   // $(".loading3").remove();

}

function geti()
{
    var idd =document.querySelectorAll('.integrate-item');
    for(let numItem of idd)
    {
        numItem.addEventListener('click' , function(e)
            {
               var ss = numItem.getAttribute('id');
                intfilter(ss);
                  // $('.loading3').remove();
                  // $('.start').removeClass('.d-none').addClass('d.block');
            })
    }

};

function moveint(){
   $('.integrate-item').click(function(){
      
      console.log('iiiiu');
      // $('.loading3').remove();
      $('.integrate').addClass('d-none');
      $('.integrate-item').addClass('d-none');
      $('.start').removeClass('d-none').addClass('d-block');
   })}

function anime(){
   $('.side-nav').animate({left: -nav_left_width}, 500);
   $('.both').addClass('fa-bars');
   $('.both').removeClass('fa-xmark');
   $(".link-nav").animate({
      top: 400
  }, 500)
}

function ser(){
$(".search_li").click(function(){
   $('.start').removeClass('d-block').addClass('d-none');
   $('.search-sec ').removeClass('d-none').addClass('d-block');
   $('.category').removeClass('d-block').addClass('d-none');
   $('.area').removeClass('d-block').addClass('d-none');
   $('.integrate').removeClass('d-block').addClass('d-none');
   $('.contact-us').removeClass('d-block').addClass('d-none');
   $('.details').removeClass('d-block').addClass('d-none');
   anime();
  

})}
function catli(){
$(".cat_li").click(function(){
   console.log('kkkkkkk');
   catData();
   $('.start').removeClass('d-block').addClass('d-none');
   $('.category ').removeClass('d-none').addClass('d-block');
   $('.search-sec ').removeClass('d-block').addClass('d-none');
   $('.area').removeClass('d-block').addClass('d-none');
   $('.integrate').removeClass('d-block').addClass('d-none');
   $('.contact-us').removeClass('d-block').addClass('d-none');
   $('.details').removeClass('d-block').addClass('d-none');
   anime();

})}
function areali(){
$(".area_li").click(function(){
   getarea();
   $('.start').removeClass('d-block').addClass('d-none');
   $('.category ').removeClass('d-block').addClass('d-none');
   $('.search-sec ').removeClass('d-block').addClass('d-none');
   $('.area').removeClass('d-none').addClass('d-block');
   $('.integrate').removeClass('d-block').addClass('d-none');
   $('.contact-us').removeClass('d-block').addClass('d-none');
   $('.details').removeClass('d-block').addClass('d-none');
   anime();


})}
function intli(){
$(".int_li").click(function(){
   getint();
   $('.start').removeClass('d-block').addClass('d-none');
   $('.category ').removeClass('d-block').addClass('d-none');
   $('.search-sec ').removeClass('d-block').addClass('d-none');
   $('.area').removeClass('d-block').addClass('d-none');
   $('.integrate').removeClass('d-none').addClass('d-block');
   $('.contact-us').removeClass('d-block').addClass('d-none');
   $('.details').removeClass('d-block').addClass('d-none');
   anime();


})}
function con(){
$(".contact_li").click(function(){
   $('.start').removeClass('d-block').addClass('d-none');
   $('.category ').removeClass('d-block').addClass('d-none');
   $('.search-sec ').removeClass('d-block').addClass('d-none');
   $('.area').removeClass('d-block').addClass('d-none');
   $('.integrate').removeClass('d-block').addClass('d-none');
   $('.contact-us').removeClass('d-none').addClass('d-block');
   $('.details').removeClass('d-block').addClass('d-none');
   anime();


})}


// -------------------------------------------

function displaycontact()
{
   var cartona = ` <div class="contact">
   <div class="container w-75 text-center">
       <div class="row g-4">
           <div class="col-md-6">
               <input type="text" class="form-control" placeholder="Enter Your Name" id='nameinput' onkeyup="validation()">
               <div id="nameAlert" class="p-3 rounded-2 w-100 mt-2 d-none"style="background-color: #f8d7da; color: #b02a37;">
                   Special characters and numbers not allowed
               </div>
           </div>
           <div class="col-md-6">
               <input type="email" class="form-control " placeholder="Enter Your Email" id="emailinput" onkeyup="validation()">
               <div id="emailAlert" class="p-3 rounded-2 w-100 mt-2 d-none"style="background-color: #f8d7da; color: #b02a37;">
                   Email not valid *exemple@yyy.zzz
               </div>
           </div>
           <div class="col-md-6">
               <input type="text" class="form-control " placeholder="Enter Your Phone" id="phoneinput" onkeyup="validation()">
               <div id="phoneAlert" class="p-3 rounded-2 w-100 mt-2 d-none"style="background-color: #f8d7da; color: #b02a37;">
                   Enter valid Phone Number
               </div>
           </div>
           <div class="col-md-6">
               <input type="number" class="form-control " placeholder="Enter Your Age" onkeyup="validation()" id="ageinput">
               <div id="ageAlert" class="p-3 rounded-2 w-100 mt-2 d-none " style="background-color: #f8d7da; color: #b02a37;">
                   Enter valid age
               </div>
           </div>
           <div class="col-md-6">
               <input type="password" class="form-control " placeholder="Enter Your Password" onkeyup="validation()" id="passinput">
               <div id="passwordAlert" class="p-3 rounded-2 w-100 mt-2 d-none" style="background-color: #f8d7da; color: #b02a37;">
                   Enter valid password *Minimum eight characters, at least one letter and one number:*
               </div>
           </div>
           <div class="col-md-6">
               <input type="password" class="form-control " placeholder="Repassword" onkeyup="validation()" id="repass">
               <div id="repasswordAlert" class="p-3 rounded-2 w-100 mt-2 d-none" style="background-color: #f8d7da; color: #b02a37;">
                   Enter valid repassword 
               </div>
           </div>
       </div>
       <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
   </div>

</div>`
document.getElementById('finalcon').innerHTML=cartona;
}
displaycontact();

function namevalid()
{
   var nameinput = document.getElementById('nameinput').value ;
   var nameReg = /^[a-zA-Z]+$/ ;
   var nameresult = nameReg.test(nameinput);
   return nameresult;
}

function emailvalid()
{
   var emailinput = document.getElementById('emailinput').value ;
   var emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ ;
   var emailresult = emailReg.test(emailinput);
   return emailresult;
}

function phonevalid()
{
   var phoneinput = document.getElementById('phoneinput').value ;
   var phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ ;
   var phoneresult = phoneReg.test(phoneinput);
   return phoneresult;
}

function agevalid()
{
   var ageinput = document.getElementById('ageinput').value ;
   var ageReg = /^([1-9]|[1-9][0-9]|[1][0-9][0-9]|200)$/ ;
   var ageresult = ageReg.test(ageinput);
   return ageresult;
}

function passvalid()
{
   var passinput = document.getElementById('passinput').value ;
   var passReg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/ ;
   var passresult = passReg.test(passinput);
   return passresult;
}
function repassvalid()
{
   var repass=document.getElementById("repass").value;
   var passinput = document.getElementById('passinput').value ;
   return repass ==passinput ;

}


var nameAlert = document.getElementById('nameAlert');
var emailAlert = document.getElementById('emailAlert');
var phoneAlert = document.getElementById('phoneAlert');
var ageAlert = document.getElementById('ageAlert');
var passwordAlert = document.getElementById('passwordAlert');
var repasswordAlert = document.getElementById('repasswordAlert');

function validation()
{
   if(namevalid())
   {
      nameAlert.classList.replace('d-block','d-none');
   }
   else
   {
      nameAlert.classList.replace('d-none','d-block');
   }
   if(emailvalid())
   {
      emailAlert.classList.replace('d-block','d-none');
   }
   else
   {
      emailAlert.classList.replace('d-none','d-block');
   }

   if(phonevalid())
   {
      phoneAlert.classList.replace('d-block','d-none');
   }
   else
   {
      phoneAlert.classList.replace('d-none','d-block');
   }
   if(agevalid())
   {
      ageAlert.classList.replace('d-block','d-none');
   }
   else
   {
      ageAlert.classList.replace('d-none','d-block');
   }
   if(passvalid())
   {
      passwordAlert.classList.replace('d-block','d-none');
   }
   else
   {
      passwordAlert.classList.replace('d-none','d-block');
   }
   if(repassvalid())
   {
      repasswordAlert.classList.replace('d-block','d-none');
   }
   else
   {
      repasswordAlert.classList.replace('d-none','d-block');
   }
   var buttondis = document.getElementById('submitBtn');

if (namevalid()&& emailvalid() && phonevalid() && agevalid() && passvalid() && repassvalid())
{
     
     buttondis.removeAttribute("disabled");
}
else
{
   buttondis.setAttribute("disabled" , true);
}

}










   
