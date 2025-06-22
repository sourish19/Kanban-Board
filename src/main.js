// CLASS & ID SELECTORS
const SELECTORS = {
  create_board_bttn: ".new-board-button",
  modal_new_board: ".modal-new-board",
  input_board_name: ".input-board-name",
  input_board_desc: ".input-board-desc",
  create_add_bttn: ".new-add-bttn",
  boards_container: ".boards-container",
  modal_new_task: ".modal-new-task",
  board: ".board",
  task_container: ".task-cards-container",
  add_taskCard_bttn: ".add-taskcard-bttn",
  taskCard_color: "#taskCard_colors",
  taskCard_content: ".taskCard_content",
};

// DECLARE CONST VARIABLES
const createBoard_bttn = document.querySelector(SELECTORS.create_board_bttn);
const modalBoard = document.querySelector(SELECTORS.modal_new_board);
const modalBoard_Input_BoardName = document.querySelector(
  SELECTORS.input_board_name
);
const modalBoard_Input_BoardDes = document.querySelector(
  SELECTORS.input_board_desc
);
const createBoard_addbttn = document.querySelector(SELECTORS.create_add_bttn);
const boards_Container = document.querySelector(SELECTORS.boards_container);
const modalTaskCard = document.querySelector(SELECTORS.modal_new_task);
const add_TaskCard_bttn = document.querySelector(SELECTORS.add_taskCard_bttn);
const taskCard_color = document.querySelector(SELECTORS.taskCard_color);
const taskCard_content = document.querySelector(SELECTORS.taskCard_content);

// DECLARE LET VARIABLES
let modalpopup_flag = false;
let taskContainer = "";

// EVENT LISTNERS
createBoard_bttn.addEventListener("click", newBoardFn);
createBoard_addbttn.addEventListener("click", addNewBoard);
boards_Container.addEventListener("click", newTaskCardsFn);
add_TaskCard_bttn.addEventListener("click", getValuesForNewTaskFn);

// FUNCTIONS
function newBoardFn() {
  if (modalpopup_flag) return;
  modalpopup_flag = true;
  modalBoard.classList.toggle("hidden", false);
}

function addNewBoard() {
  if (!modalpopup_flag) {
    return;
  }
  const board_name = modalBoard_Input_BoardName.value.trim();
  const board_desc = modalBoard_Input_BoardDes.value.trim();

  if (!board_desc || !board_name) {
    alert("Please provide the required field");
    return;
  }

  modalpopup_flag = false;
  modalBoard.classList.toggle("hidden", true);
  createNewBoardFn(board_name, board_desc);
  return;
}

function createNewBoardFn(board_name, board_desc) {
  const board = `
    <div
  class="board bg-gray-100 flex flex-col min-w-[400px] rounded-2xl h-full shadow-gray-400"
>
  <div class="board-heading flex justify-between p-3">
    <div class="flex justify-start items-center gap-3">
      <div class="board-heading font-mono text-xl">${board_name}</div>

      <div
        class="tasks-number font-mono text-lg rounded-full text-white bg-gray-400 w-6 h-6 flex justify-center items-center"
      >
        0
      </div>
    </div>
    <div class="flex gap-5 justify-center items-center">
      <i
        class="fa-solid fa-pencil cursor-pointer active:scale-90 transition duration-150"
      ></i>
      <i
        class="fa-solid fa-trash cursor-pointer active:scale-90 transition duration-150"
      ></i>
    </div>
  </div>

  <div class="custom-dashed-circle pb-3 pl-3 pr-3 w-100">${board_desc}</div>

  <div class="task-cards-container flex flex-col gap-2 p-3 flex-grow"></div>
  <div
    class="text-center pt-3 pb-3 hover:bg-gray-300 active:scale-90 transition duration-150"
  >
    <button
      class="add-item-bttn cursor-pointer w-full h-full font-mono text-xl"
    >
      Add Item<i class="fa-sharp-duotone fa-solid fa-plus pl-2"></i>
    </button>
  </div>
</div>
  `;
  boards_Container.innerHTML += board;
}

function newTaskCardsFn(e) {
  if (modalpopup_flag) return;
  const element = e.target;
  if (element.classList.contains("add-item-bttn")) {
    modalpopup_flag = true;
    modalTaskCard.classList.toggle("hidden", false);
    const board = element.closest(SELECTORS.board);
    taskContainer = board.querySelector(SELECTORS.task_container);
  }
}

function getValuesForNewTaskFn() {
  const date = new Date();
  const currDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })},${date.getFullYear()}`;
  const task_color = taskCard_color.value;
  const task_content = taskCard_content.value;
  if (!task_content) {
    alert("Please provide Task Name");
    return;
  }
  modalTaskCard.classList.toggle("hidden", true);
  modalpopup_flag = false;
  addNewTaskFn(currDate, task_color, task_content);
}

function addNewTaskFn(date, color, content) {
  const colorMap = {
    amber: "bg-amber-300",
    blue: "bg-blue-300",
    red: "bg-red-300",
    indigo: "bg-indigo-300",
    green: "bg-green-300",
  };

  const task_card = `
  <div
  class="card flex flex-col gap-y-2.5 w-[380px] justify-center ${
    colorMap[color] || "bg-gray-300"
  } shadow-md shadow-gray-400 rounded p-2 text-base cursor-pointer"
  >
    <div class="flex justify-between">
      <div class="flex justify-center gap-2.5 items-center">
        <i class="fa-regular fa-calendar text-sm"></i>
        <div class="text-sm">${date}</div>
      </div>
      <div>
        <i
          class="fa-solid fa-pencil pr-3 active:scale-90 transition duration-150"
        ></i>

        <i
          class="fa-solid fa-xmark active:scale-90 transition duration-150"
        ></i>
      </div>
    </div>
    <div class="task-content font-semibold">${content}</div>
  </div>
  `;
  taskContainer.innerHTML += task_card;
}
