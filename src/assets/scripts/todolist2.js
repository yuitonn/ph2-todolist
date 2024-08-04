"use strict";

const inputElement = document.getElementById("new-todo");
const addButtonElement = document.getElementById("add-button");
const todoListElement = document.getElementById("todo-list");

const todoList = [];
let updateIndex = null;

// ボタンを押された時、更新なのか追加なのか
const addOrUpdateTodo = () => {
    const value = inputElement.value.trim();
    if (value) {
        if (updateIndex !== null) {
    // null=何も入っていない,この文ではupdateIndexになにか入っていた場合の時の動作
            todoList[updateIndex].text = value;
    //inputに入れられたものを指定のところに更新,オブジェクトのtextを更新
    // 指定のindexを,updateIndex=index
    // つまり更新したものを探し出せる
            updateIndex = null;
            addButtonElement.textContent = '追加';
    // からにしておく、追加に戻す
        } else {
            todoList.push({text: value, completed: false});   
        }
        renderTodoList();
        inputElement.value = "";
    }
}

const renderTodoList = () => {
    todoListElement.innerHTML = "";
    todoList.forEach((todo, index) => {
        const todoElement = createTodoElement(todo,index);
        todoListElement.appendChild(todoElement);
    });
}

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = todo.text;

    const completeButton = document.createElement("button");
    completeButton.textContent = todo.completed ? "Undo" : "Complete"
    completeButton.classList = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-2";
    completeButton.addEventListener("click", () => toggleTodo(index));
    li.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList = "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded";
    deleteButton.addEventListener("click", () => deleteTodo(index));
    li.appendChild(deleteButton);

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.classList = "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mx-2";
    updateButton.addEventListener("click", () => updateTodo(index));
    li.appendChild(updateButton);

    return li;
}

const toggleTodo = (index) => {
    todoList[index].completed = !todoList[index].completed;
    if (todoList[index].completed) {
        Swal.fire({
        icon: 'success',
        title: '完了!',
        text: 'ToDoが完了しました。',
        timer: 1500,
        });
    }
    renderTodoList();
};

const deleteTodo = (index) => {
    todoList.splice(index, 1);
    renderTodoList();
}

// 追加ボタンを更新ボタンにすることによって、追加したらrenderして更新されるようにする
const updateTodo = (index) => {
    inputElement.value = todoList[index].text;
    // テキストを入力フィールドに表示,html要素のvalue=""を変えている
    // アップデートボタンにリンスしているindexのオブジェクトのvalueを表示させる
    addButtonElement.textContent = "更新";
    // 追加を更新に書き換える
    // 追加ボタンを更新用途でも使用したい = addTodo関数を条件分岐する
    updateIndex = index;
    // 条件分岐のために入れとく,再割り当て,nullからindexへ
    // updateIndexに位置を代入
}

addButtonElement.addEventListener("click", addOrUpdateTodo);