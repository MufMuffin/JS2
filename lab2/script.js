const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const $formContainer =$(`
  <div class="todo-form-container">
    <div class="todo-form-group">
      <input type="text" id="inline-todo-input" placeholder="Введіть текст нового завдання..." />
      <button type="button" id="submit-todo-btn">Додати</button>
      <button type="button" id="cancel-todo-btn">Скасувати</button>
    </div>
  </div>
`);

$('#todo-list').before($formContainer);

function updateCounts() {
  const allTodosCount = $('#todo-list li').length;
  const uncheckedCount = $('#todo-list input[type="checkbox"]:not(:checked)').length;

  $('#item-count').text(allTodosCount);
  $('#unchecked-count').text(uncheckedCount);
}

function hideForm() {
  $formContainer.slideUp(200);$('#inline-todo-input').val('');
}

function newTodo() {
  $formContainer.slideDown(200);$('#inline-todo-input').focus();
}

function submitTodo() {
  const text = $('#inline-todo-input').val().trim();

  if (text === '') {
    alert('Будь ласка, введіть текст завдання!');
    return;
  }

  const $checkbox =$('<input>')
    .attr('type', 'checkbox')
    .addClass(classNames.TODO_CHECKBOX)
    .on('change', updateCounts);

  const $span =$('<span>')
    .addClass(classNames.TODO_TEXT)
    .text(text);

  const $deleteBtn =$('<button>')
    .addClass(classNames.TODO_DELETE)
    .text('Видалити')
    .on('click', function() {
      $(this).closest('li').remove();
      updateCounts();
    });

  const $li =$('<li>')
    .addClass(classNames.TODO_ITEM)
    .append($checkbox, $span,$deleteBtn);

  $('#todo-list').append($li);

  updateCounts();
  hideForm();
}

$(document).on('click', '#submit-todo-btn', submitTodo);
$(document).on('click', '#cancel-todo-btn', hideForm);

$(document).on('keypress', '#inline-todo-input', function(e) {
  if (e.which === 13) {
    submitTodo();
  }
});