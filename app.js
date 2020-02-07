$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=101',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
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

    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=101',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#new-task-content').val()
          }
        }),
        success: function (response, textStatus) {
          $('#new-task-content').val('');
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    };

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=101',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
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
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=101',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=101',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
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

  getAndDisplayAllTasks();
});

// show data mark as completed
var completedData = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=101',
    dataType: 'json',
    success: function(response, textStatus) {
      $('#todo-list').empty();
      response.tasks.forEach(function(task) {
        if (task.completed === true) {
          $('#todo-list').append(
            '<div class="row content-tasks"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') +
            '><p class="task-input">' + task.content + '</p><button class="delete" data-id="' +
            task.id + '">X</button>');
        }
        });
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

$(document).on('click', '#done', function(){
  completedData();
});

// show active data
var activeData = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=101',
    dataType: 'json',
    success: function(response, textStatus) {
      $('#todo-list').empty();
      response.tasks.forEach(function(task) {
        if (task.completed === false) {
          $('#todo-list').append(
            '<div class="row content-tasks"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') +
            '><p class="task-input">' + task.content + '</p><button class="delete" data-id="' +
            task.id + '">X</button>');
        }
        });
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

$(document).on('click', '#pending', function(){
  activeData();
});

$(document).on('click', '#all-data', function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=101',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').empty();
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
});
