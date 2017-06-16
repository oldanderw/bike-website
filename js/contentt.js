'use strict'
  const len = 76
  let xhr = new XMLHttpRequest()
  xhr.onload = function() {
    const {products, posts, events, benefits, copyright} =  JSON.parse(xhr.responseText)
    let post = ``
    let element
    if (xhr.status === 200) {
      if (document.querySelector('#shop') != null ) {
        if(document.querySelector('#searchForm') != null){
          post = `
            <h1>Shop</h1>
            <form name="searchForm" id="searchForm">
              <input type="text" name="search" id="search" /><input type="submit" id="ssubmit" value="search" />
            </form>
            `
        }else {
            post = `<h1>shop <strong>feature products</strong></h1>`
        }
        for (let i = 0; i < 8; i++) {
          post += `
          <article class=${products[i].salePrice != "" ? "sale" : "NoSale"}>
            <img src="${products[i].imageURL}" alt="${products[i].title}">
            <p class="rating" data-rating="${products[i].rating}"><meter min="0" max="5" value="${products[i].rating}"}"></meter></p>
            <h2>${products[i].title}</h2>
            <p>${products[i].description.substring(0,len)}...</p>`
            if (products[i].salePrice != "") {
                post += `<p>$${products[i].salePrice} <del>$${products[i].price}</del></p>`
            }else {
              post += `<p>$${products[i].price}</p>`
            }
         post += `
        <p><button><img src="images/cart.png">add to cart</button></p>
         </article>
         `
        }
        element = document.querySelector('#shop')
        element.innerHTML = post
        post = ``
      }
      if(document.querySelector('#benefits') != null ){
        post += `<div><h1>cylce club <strong>members benefits</strong></h1> <ul>`
        for (let i = 0; i < 2; i++) {
          post += `<li>
              <h2>${benefits[i].title}</h2>
              <p>${benefits[i].description}</p>
            </li>`
        }
        post += `<li>
        <h2>Newsletter</h2>
        <form action="">
        <p>
          <label for="email">Email:</label>
          <input type="text" name="email" id="Iemail" placeholder="name@domain.com" />
        </p>
        <p>
          <button type="submit">Sign Up</button>
        </p>
        </form>
        </li>`
        post += `</ul></div>`
        element = document.querySelector('#benefits')
        element.innerHTML = post
        post = ``
      }
      if(document.querySelector('#blog') != null){
        let posttext
        let str
        let res
        post += `<h1>Blog</h1>`
        for (let i = 0; i < 5; i++) {
           str = posts[i].postDate // 2016-11-18
           res = str.split("-")
          post += `
            <article>
            <img src="${posts[i].imageURL}" alt="blog picture">
            <ul>
              <li>${res[1]}</li>
              <li>${res[2]}</li>
              <li>${res[0]}</li>
            </ul>
            <h1>${posts[i].title}</h1>`
          posttext =  posts[i].text.substring(0,len)
          post += `<p>${posttext}</p>
            <p><a href="#">Read more…</a></p>
           </article>
          `
        }
        element = document.querySelector('#blog')
        element.innerHTML = post
        post = ``
      }
      if(document.querySelector('#club') != null){
          let string = events[0].date
          let re = string.split("-");
          let date = re[2].split(" ");
          post += `
          <h1>Club Events</h1>
          <article>
            <img src="images/backpack.jpg" alt="large event photo">
            <h1>${events[0].title}</h1>
            <h2>hosted at ${events[0].location}</h2>
            <p>${events[0].text}</p>
            <ul class="Fdate">
              <li>${re[1]}</li>
              <li>${date[0]}</li>
              <li>${re[0]}</li>
            </ul>
          </article>
          <table>
          `
          let str
          let res
          let day
          for (let i = 1; i < 5; i++) {
            let str = events[i].date;
            let res = str.split("-");
            let day = res[2].split(" ");
            post += `
              <tr>
                <td>
                  <ul>
                    <li>${res[1]}</li>
                    <li>${day[0]}</li>
                    <li>${res[0]}</li>
                  </ul>
                 </td>
                <td>
                  <h1>${events[i].title} </h1>
                  <p> ${events[i].text}</p>
                </td>
                <td><p>${events[i].tag}</p></td>
              </tr>
              `
          }
          post += `</table>`
        element = document.querySelector('#club')
        element.innerHTML = post
        post = ``
      }
      if(document.querySelector('#copyright') != null){
          post += `United States 2016 CycleWorld, Inc. All Rights Reserved`
          element = document.querySelector('#copyright')
          element.innerHTML = post
          post = ``
      }
    }//end status
  }// end xhr.onload
    xhr.open('GET', 'data/data.json', true)
    xhr.send(null)

    function emailThing(e){
      var target = event.target;
      var error = target.nextElementSibling;
      let str1 = target.value;
      let str2 = "@";
      let str3 = ".";

      if(str1.includes(str2) == false || str1.includes(str3) == false){
        // console.log(str1.includes(str2))
         error.style.display = 'block';
         error.innerHTML = '*Please enter a vaid Email';
       }
      else{
         error.style.display = 'none'; //removes error message
         error.innerHTML = '';
     }
    }
    function differName(event) {
     var target = event.target;
     var error = target.nextElementSibling;

     if(target.value.length < 10){
       error.style.display = 'block';
       error.innerHTML = '*Please enter a vaid number';
     }else{
       error.style.display = 'none'; //removes error message
       error.innerHTML = '';
     }
   }
// Get username input
var email = document.querySelector('#Email');
email.addEventListener('blur',emailThing);
var imdiffer = document.querySelector('#tel');
imdiffer.addEventListener('blur', differName);
// The event object is automatically passed to function
