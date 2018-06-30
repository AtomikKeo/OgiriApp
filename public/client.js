function render(todos){
    $(".answers").children().not(".template").remove();
    const template = $(".answers").children(".template");

    template.forEach((answer) => {
        const node = template.clone(true).show().removeClass("template");

        node.find(".text").text(answer.text);
        node.find(".id").text(answer._id);
        node.find(".votes").text(answer.votes);
        node.find(".name").text(answer.name);
        $(".answers").append(node);
    });
}

function getAnswers(){
    fetch('/api/answers')
        .then((data) => data.json())
        .then((json) => {
            const answers = json;
            render(answers);
        });
}

function createTodo(){
    const text = $(".new-todo-text").val();
    fetch('/api/todos', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: text}),
        })
        .then(() => {
            getTodos();
        });
}

function createAnswer(){
    const name = $(".new-name-text").val();
    const text = $(".new-answer-text").val();
    fetch('/api/answers', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, text: text}),
        })
        .then(() => {
            getAnswers();
        });
}


function deleteTodo(el){
    const id = $(el).closest(".todo").find(".id").text();
    fetch(`/api/todos/${id}`, {
            method: 'DELETE'
    })
    .then(() => {
        getTodos();
    });
}

function getTime(){
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    const time = $("#time");

    time.text(y + '年' + m + '月' + d + '日');
}

$(getAnswers);
$(getTime);