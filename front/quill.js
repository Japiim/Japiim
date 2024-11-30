import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);

let ydoc = new Y.Doc();
let ycolumns = ydoc.getArray('columns');
const provider = new WebsocketProvider("ws://localhost:1234", "teste", ydoc);


ycolumns.observeDeep(function() {
  document.body.innerHTML = `
    <h1>Kanban Board</h1>
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
        placeholder: 'Start collaborating...',
        theme: 'snow' // or 'bubble'
      });

      // Initialize Quill editor for title
      const titleEditor = new Quill(titleContainer, {
        theme: 'snow',
        modules: {
          cursors: true,
          toolbar: false  // Disable the toolbar to make it simple
        },
        placeholder: 'Type something...',
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
}

function createColumn(){
  console.log(ycolumns)
  const column=new Y.Array();
  ycolumns.push([column]);
}

window.createTask = createTask;
window.createColumn = createColumn;