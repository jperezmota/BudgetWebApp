var budgetController = (function(){

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {

    addItem: function(type, des, val){
      var newItem, ID;

      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length -1].id + 1;
      }else{
        ID = 0;
      }


      if(type === 'exp'){
        newItem = new Expense(ID, des, val);
      }else if(type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function(){
      console.log(data);
    }

  }

})();

var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {

    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either Inc or Exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },
    addListItems: function(obj, type){
      var html, element;

      if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="income-${obj.id}">
            <div class="item__description">${obj.description}</div>
            <div class="right clearfix">
                <div class="item__value">+ ${obj.value}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
      }else if(type === 'exp'){
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-${obj.id}">
            <div class="item__description">${obj.description}</div>
            <div class="right clearfix">
                <div class="item__value">- ${obj.value}</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
      }

      document.querySelector(element).insertAdjacentHTML('beforeend', html);

    },
    clearFields: function(){
      var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array){
        current.value = "";
      });
      fieldsArr[0].focus();
    },
    getDOMStrings: function(){
      return DOMstrings;
    }

  }

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl){

  var setupEventListeners = function(){
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function(){

    // 1. Calculate the budget.

    // 2. Return the budget.

    // 3. Present the budget on the UI

  };

  var ctrlAddItem = function(){
    var input, newItem;

    // 1. Get input data
    input = UICtrl.getInput();

    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
      // 2. Add the item to the budget controller.
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the new item to user interface
      UICtrl.addListItems(newItem, input.type);

      // 4. Clear the fields
      UIController.clearFields();

      // 5. Calculate & update  budget.
      updateBudget();

      // 6. Display the budget.
    }

  };

  return {
    init: function(){
      console.log('Application started.');
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();
