$(document).ready(function(){
  var getTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=100',
      dataType: 'json',
      success: function (response, textStatus) {
        response.tasks.forEach(function (task) {
  $('#todo-list').append(
    '<div class="row content-tasks"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') +
    '><p class="task-input">' + task.content + '</p><button class="delete" data-id="' +
    task.id + '">X</button>');
});
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var newTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=100',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#input-task').val()
        }
      }),
      success: function (response, textStatus) {
        // $('#input-task').val('');
        getTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $('#new-task').on('submit', function (e) {
    e.preventDefault();
    newTask();
  });

  getTasks();

});

var deleteTask = function (id) {
  $.ajax({
 type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=100',
    success: function (response, textStatus) {
      getTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'));
});

var markTaskComplete = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=100',
    dataType: 'json',
    success: function (response, textStatus) {
      getTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

$(document).on('change', '.mark-complete', function () {
 if (this.checked) {
    markTaskComplete($(this).data('id'));
  }
});

var markTaskActive = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=100',
    dataType: 'json',
    success: function (response, textStatus) {
      getTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
$(document).on('change', '.mark-complete', function () {
 if (this.checked) {
    markTaskComplete($(this).data('id'));
  } else {
    markTaskActive($(this).data('id'));
  }
});
