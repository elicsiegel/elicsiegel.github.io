
function addTodo() {
  const todoValue = $l('input').val(); 
  const todo = document.createElement("li");
  
  if (todoValue !== "") {
    $l('li.default-todo').remove();
    $l('li.cleared-todo').remove();

    $l(todo).html(todoValue);
    $l('input').val("");   
    $l('ul.todo-items').append(todo); 
  } 
}

function clearTodos() {
  $l('ul.todo-items').children().remove(); 

  const defaultTodo = document.createElement("li");
  $l(defaultTodo).html("None pending!");
  $l(defaultTodo).addClass("cleared-todo"); 
  
  $l('ul.todo-items').append(defaultTodo); 
}

function requestGif() {
  $l('.gif-box').children().attr('src', ''); 
  $l.ajax({
    url: 'https://api.giphy.com/v1/gifs/search?q=motivation&api_key=38af2eb373c949ffaa033fe7989f6129',
    success: (res) => updateGifImage(res)
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function updateGifImage(res) {
  const num = getRandomInt(0, 26);
  $l('.gif-box').children().attr('src', res.data[num].images.original.url)
}

function generateRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function colorizeTodos(){
  const items = $l('ul.todo-items').children();
  
  for (var i = items.elements.length - 1; i >= 0; i--) {
    const color = generateRandomColor();
    
    $l(items.elements[i]).attr('style',`background-color: ${color};`); 
  }
}