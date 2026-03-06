const API_KEY="f1545b77a00b23f145e952d78a71e4ca"

let images=JSON.parse(localStorage.getItem("images")||"[]")

function render(){

let gallery=document.getElementById("gallery")

gallery.innerHTML=""

images.forEach((item,i)=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`
<img src="${item.url}">
<div class="actions">
<button onclick="downloadImage('${item.url}')">Download</button>
<button onclick="deleteImage(${i})">Delete</button>
</div>
`

gallery.appendChild(card)

})

}

function upload(){

let file=document.getElementById("fileInput").files[0]

let formData=new FormData()

formData.append("image",file)

fetch("https://api.imgbb.com/1/upload?key="+API_KEY,{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{

let url=data.data.display_url

images.push({
name:file.name,
url:url
})

localStorage.setItem("images",JSON.stringify(images))

render()

})

}

function deleteImage(i){

images.splice(i,1)

localStorage.setItem("images",JSON.stringify(images))

render()

}

function downloadImage(url){

let a=document.createElement("a")

a.href=url

a.download="photo"

a.click()

}

function searchImages(){

let text=document.getElementById("search").value.toLowerCase()

let gallery=document.getElementById("gallery")

gallery.innerHTML=""

images.filter(img=>img.name.toLowerCase().includes(text))

.forEach((item,i)=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`
<img src="${item.url}">
<div class="actions">
<button onclick="downloadImage('${item.url}')">Download</button>
<button onclick="deleteImage(${i})">Delete</button>
</div>
`

gallery.appendChild(card)

})

}

render()
