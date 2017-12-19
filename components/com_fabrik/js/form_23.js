/**
 * The form has just been loaded or the user has just chosen a division of a year:
 * -- division possibilities are: month, quarter, third, half & season
 * -- change the label on the "_choice" element
 * -- update "_choice" element with the value that may have been previously saved
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function dateDivision(thisElement) {
   var thisForm, elementFullname;
   var tableName, elementName, tabName, nameRoot;
   var divisionName, division;
   var saverName, saverValue, activeName, value;
   var suffixes, suffix;
   
   thisForm        = thisElement.form;
   elementFullname = thisElement.options.fullName;

   elementName = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   tableName   = String(elementFullname).match(/(\w+)___\w+/)[1];
   tabName     = String(elementName).match(/(\w+)_\w+/)[1];
   nameRoot    = tableName + '___' + tabName + '_';
   
   divisionLabel = thisForm.elements.get(elementFullname).getValue();
   divisionName  = divisionName.toLowerCase();

   suffixes = ['_choice', '_accuracy', '_confidence'];
   suffixes.forEach(function(suffix) {
      saverName  = nameRoot + 'saver_' + division + '_' + suffix;
      saverValue = thisForm.elements.get(saverName).getValue();

      activeName  = nameRoot + divisionName + '_' + suffix;
      
      if (suffix == '_choice') {
         thisForm.elements.get(activeName).setLabel(divisionLabel);
      }
      thisForm.elements.get(activeName).update(saverValue);
   });
   return;
}


/**
 * The form has just been loaded or the user has just chosen 
 * a value for this division of a year:
 * -- division possibilities are: month, quarter, third, half & season
 * -- stow away that value in the corresponding "_saver_" element
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function dateDivisionChoice(thisElement) {
   var thisForm, elementFullname,, nameRoot;
   var elementName, tableName, tabName;
   var divisionLabel, divisionName;
   
   thisForm        = thisElement.form;
   elementFullname = thisElement.options.fullName;                 // gn_event___start_division_xxx
   
   elementName = elementFullname.match(/[a-zA-Z0-9]+___(\w+)/)[1]; // start_division_suffix
   tableName   = elementFullname.match(/(\w+)___\w+/)[1];          // gn_event
   tabName     = elementName.match(/(\w+)_\w+/)[1];                // start
   nameRoot    = tableName + '___' + tabName + '_' + ;
   
   divisionLabel = thisForm.elements.get(elementFullname).getValue();
   divisionName  = divisionLabel.toLowerCase();

   suffixes = ['_choice', '_accuracy', '_confidence'];
   suffixes.forEach(function(suffix) {
      saverName   = nameRoot + 'saver_' + divisionName + '_' + suffix;
      saverValue  = thisForm.elements.get(saverName).getValue();
      activeName  = nameRoot + 'division_' + suffix;
      activeValue = thisForm.elements.get(activeName).getValue();
      thisForm.elements.get(saverName).update(activeValue);
   }
   return;
}


/**
 * Show/hide combinations of the Fabrik groups
 * (and their tabs) used to develop a date or
 * duration based on the chosen date type
 * (single date, start/end, start/duration,
 * duration/end, duration)
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 *
 * @TODO get list of groups 
 * @TODO new function to loop array of 3 "hide/show"s for choice switch below
 */
function dateType(thisElement)
{
   var thisForm        = thisElement.form;
   var elementFullname = String(thisElement.options.fullName);
   var elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   var tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   var tabName         = String(elementName).match(/(\w+)_\w+/)[1];

   var chosen = thisForm.elements.get(elementFullname).getValue();

   var choice1 = 'Single Date';
   var choice2 = 'Start/End';
   var choice3 = 'Start/Duration';
   var choice4 = 'Duration/End';
   var choice5 = 'Duration';

   var tabGroupA = '#group118_tab';
   var tabGroupB = '#group122_tab';
   var tabGroupC = '#group121_tab';

   switch(chosen) {
      case choice1 :
         jQuery(tabGroupA).show();
         jQuery(tabGroupB).hide();
         jQuery(tabGroupC).hide();
         jQuery(tabGroupA).trigger('click');
         break;

       case choice2 :
         jQuery(tabGroupA).show();
         jQuery(tabGroupB).hide();
         jQuery(tabGroupC).show();
         jQuery(tabGroupA).trigger('click');
         break;

       case choice3 :
         jQuery(tabGroupA).show();
         jQuery(tabGroupB).show();
         jQuery(tabGroupC).hide();
         jQuery(tabGroupA).trigger('click');
         break;

       case choice4 :
         jQuery(tabGroupA).hide();
         jQuery(tabGroupB).show();
         jQuery(tabGroupC).show();
         jQuery(tabGroupB).trigger('click');
         break;

       case choice5 :
         jQuery(tabGroupA).hide();
         jQuery(tabGroupB).show();
         jQuery(tabGroupC).hide();
         jQuery(tabGroupB).trigger('click');
         break;
   }
   return;
}