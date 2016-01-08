var TodoView = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },
  tagName: 'li',
  className: 'todo',
  template: _.template( $('#todo-template').html() ),
  render: function(){
    this.$el.empty();
    var $html = $(  this.template( this.model.toJSON() )  );
    this.$el.append( $html );
    this.countChecked();
    this.bindCheck();
  },

  countChecked: function(){
    var n = $( "input:not(:checked)" ).length - 1;
    $( "#todo-count" ).text( "Items left: " + n )
  },

  bindCheck: function(){
    this.$el.find(".checkboxes").on("change", function(){
      var n = $( "input:not(:checked)" ).length - 2;
      $( "#todo-count" ).text( "Items left: " + n );
      //strike-through logic
      if (this.checked) {
          $(this).parent().css('text-decoration', 'line-through')
      }
      else{
          $(this).parent().css('text-decoration', 'none')
      }
    }
  )}
});

var TodoListView = Backbone.View.extend({
  initialize: function(){
    // this.listenTo( this.collection, 'add', this.render );
    this.listenTo( this.collection, 'add', this.render );
  },
  render: function(){
    this.$el.empty();
    var todos = this.collection.models;
    var $view;
    for (var i = 0; i < todos.length; i++) {
      $view = new TodoView({ model: todos[i] });
      $view.render();
      this.$el.append( $view.$el );
    }
  }
});
