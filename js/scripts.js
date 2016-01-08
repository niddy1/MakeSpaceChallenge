$(document).ready(function() {
  $('#todo-count').html( "Items left: " + 0 );

// Handles "Mark all as complete link"
  $('#todo-check').on('click', function(e){
    e.preventDefault();
    $(".checkboxes").prop('checked', true);
    var n = $( "input:not(:checked)" ).length;
    $( "#todo-count" ).text( "Items left: " + 0 );
    $("li").children().css('text-decoration', 'line-through');
  });
});
///**end of doc ready

// **** MODEL

var Todo = Backbone.Model.extend({
  defaults: { description: '' }
});

// **** COLLECTION

var TodoCollection = Backbone.Collection.extend({
  model: Todo
});

var todos = new TodoCollection();

var todosPainter = new TodoListView({
  collection: todos,
  el: $('#todo-list')
});

// behavior for Add Item button
$('.create-todo').on('submit', function(e){
  e.preventDefault();
  var data = $(this);
  dataValue = data.serializeArray()[0].value;
  todos.add({description: dataValue});
  $(".form-field").val("");

});
