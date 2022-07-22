window.addEventListener("load",init);

var prodName;
var prodPrice;
var prodDesc;

function init(){
    prodName=document.getElementById("box_1");
    prodPrice=document.getElementById("box_2");
    prodDesc=document.getElementById("box_3");

    document.getElementById("add").addEventListener("click",addition);
    document.getElementById("delete").addEventListener("click",deleteItem);
    document.getElementById("update").addEventListener("click",updateItem);
    document.getElementById("save").addEventListener("click",saveItem);
    document.getElementById("load").addEventListener("click",loadItem);
    document.getElementById("sort").addEventListener("click",sortItem);
    document.getElementById("clear").addEventListener("click",clearItem);
    document.getElementById("search").addEventListener("click",searchItem);
}

function addition(){

    obj.addProduct(prodName.value,prodPrice.value,prodDesc.value);

    printProduct(obj.itemlist);

    document.myform.reset();
    prodName.focus();
}

function updateItem(){
    updatedName = document.getElementById("box_1").value;
    updatedPrice = document.getElementById("box_2").value;
    updatedDesc = document.getElementById("box_3").value;
    console.log("in controller");
    obj.editProduct(markedItems()[0].id,updatedName,updatedPrice,updatedDesc);
    printProduct(obj.itemlist);
    document.myform.reset();
    prodName.focus();
}

function changeItem(){
    document.getElementById("box_1").value=markedItems()[0].name;
    document.getElementById("box_2").value=markedItems()[0].price;
    document.getElementById("box_3").value=markedItems()[0].desc;
}
function emptBox(){
    document.getElementById("box_1").value="";
    document.getElementById("box_2").value="";
    document.getElementById("box_3").value="";
}

function markProduct(){
    var elem = event.srcElement.classList.toggle("selected");
    var currentId = event.srcElement.innerHTML.split(" ")[0];
    obj.toggleProduct(currentId);

    if(markedItems().length==0){
            document.getElementById("add").disabled=false;
            document.getElementById("save").disabled=false;
            document.getElementById("load").disabled=false;
            document.getElementById("sort").disabled=false;
            document.getElementById("clear").disabled=false;
            document.getElementById("search").disabled=false;
            document.getElementById("update").disabled=false;
            emptBox();
    }        
    else if(markedItems().length==1){
            document.getElementById("add").disabled=true;
            document.getElementById("save").disabled=true;
            document.getElementById("load").disabled=true;
            document.getElementById("sort").disabled=true;
            document.getElementById("clear").disabled=true;
            document.getElementById("search").disabled=true;
            document.getElementById("update").disabled=false;
            changeItem();
    }
    else if(markedItems().length>1){
            document.getElementById("add").disabled=true;
            document.getElementById("update").disabled=true;
            document.getElementById("save").disabled=true;
            document.getElementById("load").disabled=true;
            document.getElementById("sort").disabled=true;
            document.getElementById("clear").disabled=true;
            document.getElementById("search").disabled=true;
            emptBox();
    }
        
}

function deleteItem(){
    obj.deleteProduct();
    printProduct(obj.itemlist);
}

function markedItems(){
    var markedList = obj.itemlist.filter(function(object){
        return object.selected==true;
    })
    console.log(markedList);
    return markedList;
    
}

function printProduct(list){
    var ul = document.getElementById("itemList");
    ul.innerHTML="";
    // console.log(list);
    
    list.forEach(function(object){
        
        var li = document.createElement("li");
        if(object.selected==true){
            li.className = "selected";
        }
        else{
            li.className = "";
        }
       
        li.innerHTML = object.id+ " " + object.name + " " + object.price + " " + object.desc;

        ul.appendChild(li);
        li.addEventListener("click",markProduct);
    })
}

function saveItem(){
    if(window.localStorage){
        // console.log("after clicking save iTem");
        // console.log(obj.itemlist);
        var json = JSON.stringify(obj.itemlist);
        localStorage.setItem("productItem",json);
        alert("Data saved");
    }
    else{
        alert("not able to save");
    }
}

function loadItem(){
    if(window.localStorage){
        var json = localStorage.getItem("productItem");
        obj.itemlist = JSON.parse(json);
        printProduct(obj.itemlist);
    }
    else{
        alert("not able to retrieve data");
    }
}

function sortItem(){
    obj.itemlist=obj.itemlist.sort((a,b)=>a.price-b.price);
    printProduct(obj.itemlist);
}

function clearItem(){
    obj.itemlist.length=0;
    printProduct(obj.itemlist);
}

function searchItem(){
        var searchlist = obj.itemlist.filter(function(object){
            if(object.price==prodPrice.value){
                object.selected = true;
            }
            return true;
        })
        printProduct(searchlist);
    }
