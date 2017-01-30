(function() {
  
  const state = {
    indexOfPreviousCheckbox: null,
    indexOfCurrentCheckbox: null
  };

  const controller = {
    init: function() {
      view.init();
    },
    
    tickCheckboxes: function(e) {
      const { target } = e;
      
      if (target.nodeName === 'INPUT') {
        const itemDOM = target.parentNode.parentNode;
        state.indexOfCurrentCheckbox = Array.from(view.inboxDOM.children).indexOf(itemDOM);
        
        if (e.shiftKey && state.indexOfPreviousCheckbox !== null) {
          const isCurrentChecked = target.checked;
          const min = Math.min(state.indexOfPreviousCheckbox, state.indexOfCurrentCheckbox);
          const max = Math.max(state.indexOfPreviousCheckbox, state.indexOfCurrentCheckbox);
          
          for (let i = min; i <= max; i++) {
            view.checkboxesDOM[i].checked = isCurrentChecked;
          }
        }
        
        state.indexOfPreviousCheckbox = state.indexOfCurrentCheckbox;
      }
    }
  };

  const view = {
    init: function() {
      this.inboxDOM = document.querySelector('.inbox');
      this.inboxDOM.addEventListener('click', controller.tickCheckboxes);
      
      this.checkboxesDOM = document.querySelectorAll('input[type=checkbox]');
    }
  };

  controller.init();
  
}());
