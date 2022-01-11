/* eslint-disable quotes */
/* eslint-disable default-case */
import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _;

  return element;
}

document.body.appendChild(component());

const list = document.getElementById('todos-list');
const addInput = document.getElementById('todo-input');

function createTodo() {
  const text = addInput.value;

  if (text === '') {
    return;
  }

  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.classList.add('checkbox');
  checkbox.type = 'checkbox';

  const paragraph = document.createElement('p');
  paragraph.classList.add('paragraph');
  paragraph.textContent = text;

  const remove = document.createElement('span');
  remove.classList.add('remove');
  remove.innerHTML = `<i class="fas fa-ellipsis-v"></i>`;

  li.appendChild(checkbox);
  li.appendChild(paragraph);
  li.appendChild(remove);
  list.appendChild(li);

  addInput.value = '';
}

function showEditInput(paregraphElement) {
  const editInput = document.getElementsByName('editInput')[0];
  if (editInput) {
    editInput.remove();
  }

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'editInput';
  input.value = paregraphElement.textContent;
  input.classList.add('editInput');

  paregraphElement.parentElement.appendChild(input);
  input.focus();
}

function removeTodo(removeElement) {
  removeElement.parentElement.remove();
}

function toggleComplete(inputElement) {
  if (inputElement.checked === false) {
    inputElement.parentElement.classList.remove('complete');
  } else {
    inputElement.parentElement.classList.add('complete');
  }
}

list.addEventListener('click', (event) => {
  event.stopPropagation();

  switch (event.target.tagName) {
    case 'p':
      showEditInput();
      break;
    case 'SPAN':
      removeTodo(event.target);
      break;
  }
});

list.addEventListener('change', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    toggleComplete(event.target);
  }
});

list.addEventListener('keypress', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    toggleComplete(event.target);
  }
});

addInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    createTodo();
  }
});
// eslint-disable-next-line no-multiple-empty-lines
