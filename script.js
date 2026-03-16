let docs = JSON.parse(localStorage.getItem("docs")) || []
let cropper
let editIndex

function login(){

let u=username.value
let p=password.value

if(u==="admin" && p==="1234"){

loginPage.style.display="none"
appPage.style.display="block"

showDocs()

}else{

alert("Wrong Login")

}

}

function logout(){

location.reload()

}

function openGallery(){

galleryInput.click()

}

galleryInput.onchange=function(){

let file=this.files[0]

let reader=new FileReader()

reader.onload=function(e){

saveDoc(e.target.result)

}

reader.readAsDataURL(file)

}

function saveDoc(img){

let name=docname.value

docs.push({name:name,img:img})

localStorage.setItem("docs",JSON.stringify(docs))

showDocs()

}

function showDocs(){

list.innerHTML=""

docs.forEach((d,i)=>{

list.innerHTML+=`

<div class="card">

<h4>${d.name}</h4>

<img src="${d.img}">

<br>

<button class="edit" onclick="editDoc(${i})">Edit</button>

<button class="delete" onclick="deleteDoc(${i})">Delete</button>

</div>

`

})

}

function deleteDoc(i){

docs.splice(i,1)

localStorage.setItem("docs",JSON.stringify(docs))

showDocs()

}

function editDoc(i){

editIndex=i

appPage.style.display="none"

editorPage.style.display="block"

editorImage.src=docs[i].img

cropper=new Cropper(editorImage)

}

function rotate(){

cropper.rotate(90)

}

function applyFilter(){

editorImage.style.filter="contrast(120%) brightness(110%)"

}

function saveEdit(){

let canvas=cropper.getCroppedCanvas()

docs[editIndex].img=canvas.toDataURL()

localStorage.setItem("docs",JSON.stringify(docs))

closeEditor()

showDocs()

}

function closeEditor(){

editorPage.style.display="none"

appPage.style.display="block"

cropper.destroy()

}
