import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);

let ydoc = new Y.Doc();
let ycolumns = ydoc.getArray('columns');
let ynotifications = ydoc.getArray('notifications');
const provider = new WebsocketProvider("ws://localhost:1234", "teste", ydoc);
const awareness = provider.awareness;

ynotifications.observe(function(){
  if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission()
  }
  if(document.hidden){
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(ynotifications.get(ynotifications._length-1));
    // …
  }
}});

ycolumns.observeDeep(function() {
  const users=document.querySelector('#users')
  document.body.innerHTML = `
    <h1>Kanban Board</h1>
    <div id="users-container">
        <h3>Usuários</h3>
        ${users.outerHTML}
      </div>
    <button class="btn btn-primary mb-3" onclick="createColumn()">Create Column</button>
    <div id="board" class="d-flex"></div>
  `;
  
  ycolumns.forEach(function(columns, index) {
    const columnContainer = document.createElement('div');
    columnContainer.setAttribute('id', index);
    columnContainer.classList.add('col-md-3', 'p-3', 'border', 'rounded', 'mr-2', 'bg-light');
    
    const board = document.getElementById('board');
    board.append(columnContainer);

    
    const columnTitle = ydoc.getText(`${index}-title`);
    const columnTitleContainer = document.createElement('div');
    columnTitleContainer.setAttribute('id', `${index}-title`);
  
    columnContainer.append(columnTitleContainer);
    
    const columnTitleEditor = new Quill(columnTitleContainer, {
      theme: 'snow',
      modules: {
        cursors: true,
        toolbar: false // Disable the toolbar to keep it simple
      },
      placeholder: 'Titulo da Coluna',
    });
    
    // Enforce bold formatting and H2 size
    columnTitleContainer.style.fontWeight = 'bold';
    columnTitleContainer.style.fontSize = '2rem'; // Match H2 size
    columnTitleContainer.style.lineHeight = '1.5';
    columnTitleContainer.style.whiteSpace = 'nowrap'; // Prevent wrapping
    columnTitleContainer.style.overflow = 'hidden'; // Hide overflow content
    columnTitleContainer.style.textOverflow = 'ellipsis'; // Add ellipsis if text is too long
    columnTitleContainer.style.height = '60px'; // Fixed height for consistency
    columnTitleContainer.style.padding = '0';
    columnTitleContainer.style.margin = '0';
    
    // Restrict editor to a single line
    columnTitleEditor.on('text-change', () => {
      const text = columnTitleEditor.getText();
      if (text.includes('\n')) {
        columnTitleEditor.deleteText(text.indexOf('\n'), 1);
      }
    });

    const createTaskButton = document.createElement('button');
    createTaskButton.innerText = 'Create Task';
    createTaskButton.classList.add('btn', 'btn-success', 'mt-2');
    createTaskButton.onclick = () => createTask(index);
    columnContainer.append(createTaskButton);

    const columnTitleBinding = new QuillBinding(columnTitle, columnTitleEditor, provider.awareness);

    columns.forEach(function(column) {
      // Get text types for title and description
      const title = ydoc.getText(`${column}-${index}-title`);
      const desc = ydoc.getText(`${column}-${index}-desc`);

      // Create a parent container div for title and description
      const parentContainer = document.createElement('div');
      parentContainer.setAttribute('id', `${column}-${index}`);
      parentContainer.classList.add('task-container', 'mb-3', 'p-2', 'border', 'rounded', 'bg-white');
      columnContainer.append(parentContainer);

      // Create a title container
      const titleContainer = document.createElement('div');
      titleContainer.setAttribute('id', `${column}-${index}-title`);
      titleContainer.classList.add('title-container', 'font-weight-bold');
      parentContainer.append(titleContainer);

      // Create a description container
      const descContainer = document.createElement('div');
      descContainer.setAttribute('id', `${column}-${index}-desc`);
      descContainer.classList.add('desc-container');
      parentContainer.append(descContainer);
      
      // Initialize Quill editor for description
      const descEditor = new Quill(descContainer, {
        modules: {
          cursors: true,
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ],
          history: {
            userOnly: true
          }
        },
        placeholder: 'Descrição',
        theme: 'snow' // or 'bubble'
      });

      // Initialize Quill editor for title
      const titleEditor = new Quill(titleContainer, {
        theme: 'snow',
        modules: {
          cursors: true,
          toolbar: false  // Disable the toolbar to make it simple
        },
        placeholder: 'Titulo da Task',
        formats:['bold']
      });

      // Bind the editors to Yjs
      const descBinding = new QuillBinding(desc, descEditor, provider.awareness);
      const titleBinding = new QuillBinding(title, titleEditor, provider.awareness);
    });
  });
});

// Function to create a new column
function createTask(columnId) {
  ycolumns.get(columnId).push([ycolumns.get(columnId)._length]);
  const titleId=`${ycolumns._length-1}-title`
  ynotifications.push([`Task criada na coluna ${document.getElementById(titleId).innerText}!`])
}

function createColumn(){
  console.log(ycolumns)
  const column=new Y.Array();
  ycolumns.push([column]);
  ynotifications.push(["Coluna Criada!"])
}

awareness.on('change', () => {
  // Map each awareness state to a dom-string
  const strings = []
  awareness.getStates().forEach(state => {
    console.log(state)
    if (state.user) {
      strings.push(`<div style="color:${state.user.color};">• ${state.user.name}</div>`)
    }
    document.querySelector('#users').innerHTML = strings.join('')
  })
});

export const userColors = [
  '#FFFF00', // Bright Yellow
  '#FFD700', // Gold
  '#000000', // Black
  '#1C1C1C'  // Dark Gray (close to black)
];

const myColor = userColors[Math.floor(Math.random() * userColors.length)];


awareness.setLocalStateField('user', {
  name: username,
  color: myColor
});


window.createTask = createTask;
window.createColumn = createColumn;