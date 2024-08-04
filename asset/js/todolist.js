"use strict";

const inputElement = document.getElementById("new-todo");
const addButtonElement = document.getElementById("add-button");
const todoListElement = document.getElementById("todo-list");
// input,button,list

let todoList = [];

addButtonElement.addEventListener("click", addTodo);

// ① 書かれた時の動作
const addTodo = () => {
    // 一連の関数を定義
    const value = inputElement.value.trim();
    // inputの中身value=""を取得してvalueとして定義,trimは空白を削除
    if (value) {
    // valueが存在する=中身がinputに入った時に
        todoList.push({ text: value, completed: false });
    // 配列の後ろにオブジェクトとして,{呼び出すための名前とvalue,完了状態}という値として格納
    // completedプロパティの初期値をfalseに
        inputElement.value = "";
    // 格納したらinputの中身をカラにする
        renderTodoList();
    // 下の関数を呼び出す,②へ移動
    }
}
// 今はtodoListにオブジェクト全体が,logとして表示されるだけ(listに格納も)
// 書かれたものをリストに保存


// （都度 HTML を更新して）表示②
// 既存のリストをクリアしないと前のものと（ulタグの中身）重複してしまう
// オブジェクトをサイトに追加
const renderTodoList = () => {
    // 更新
    todoListElement.innerHTML = ""; 
    // ulの中身をカラにする
    todoList.forEach((todo, index) => {
    // todoListのオブジェクトにtodoという名前をつける
        const todoElement = createTodoElement(todo, index);
    // todoElement = ②のcleate関数に探した値を因数として指定して呼び出す,つまりli
        todoListElement.appendChild(todoElement);
    // ulの中に追加
    // todoElement = li
    });
}

// ③
// 追加するオブジェストからtextだけを取得したい
const createTodoElement = (todo, index) => {
    // 一連の関数を定義,受け取った引数を代入
    const li = document.createElement("li");
    // "li"Listのこと,liという名前のListを生成
    li.innerHTML = todo.text;
    // liのhtml要素にtodoオブジェクトのvalueを表示
    // listをhtmlに追加しただけ


    const completeButton = document.createElement("button");
    // ボタンタグを作成
    completeButton.textContent = todo.completed ? "Undo" : "Compleat";
    // todoオブジェクトがtrueならundo,falseならcomplete
    completeButton.classList = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-2";
    completeButton.addEventListener("click", () => toggleTodo(index));
    // 押された時に,何番目のものをトグルに渡すか
    li.appendChild(completeButton);
    // さっき作ったliの中にボタンタグを追加

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList = "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded";
    deleteButton.addEventListener("click", () => deleteTodo(index));
    // ボタンだ押された時に,deleteTodo関数を呼び出す,何番目のものかという情報を読み込む
    li.appendChild(deleteButton);


    return li;
    // 結果を関数元に返して,したの関数に代入できるようにする
};

const toggleTodo = (index) => { 
    todoList[index].completed = !todoList[index].completed;
// indexによって指定されたオブジェクトのcompletedプロパティを論理否定演算子で逆に
    renderTodoList();
//これをしないと 
// completeButton.textContent = todo.completed ? "Undo" : "Compleat";が反映されない
}

const deleteTodo = (index) => {
    todoList.splice(index, 1);
// index(todoオブジェクトの何番目か)を探し,そこから一つ消す
    renderTodoList();
// リストを最新の状態に更新
};


