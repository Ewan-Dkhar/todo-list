import axios from "axios";

async function getItems(){
    const result = await axios.get("http://localhost:3000/getlist");
    return result.data;
}

async function addItem(item){
    await axios.post("http://localhost:3000/add", item, {headers: {'Content-Type': 'application/json',}});
}

async function editItem(id, isDone){
    await axios.post("http://localhost:3000/editisdone", {id, isDone});
}

async function deleteItem(id){
    await axios.post("http://localhost:3000/delete", {id});
}

export {getItems, addItem, deleteItem, editItem};