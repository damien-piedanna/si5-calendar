(function() {
  "use strict";

  let nbDay = 5;
  let nbSlotPerDay = 2;

  $(document).ready(function() {
    mineurs = $.parseJSON(mineurs).courses;
    loadMineurSelect(mineurs);
    options = $.parseJSON(options).courses;
    loadOptionCheckbox(options);

    //Choosing mineur
    $('#select-mineur').change(function() {
      $('.mineur').remove();
      $('.select-option').removeAttr('disabled');
      if (this.value > -1) loadCourse(this.value, 'mineur', mineurs[this.value]);

    });

    //Choosing option
    $('.select-option').change(function() {
      let slot = $(this).data('slot');
      removeOptionSlot(slot);
      if (this.value > -1) loadCourse(this.value, 'option', options[this.value]);
    });
  });

  /*
  * Loading mineur select
  */
  function loadMineurSelect(mineurs) {
    mineurs.forEach((mineur, index) => {
      $('#select-mineur').append('<option value="' + index + '">' + mineur.name + '</option>');
    });
  }

  /*
  * Loading mineur select
  */
  function loadOptionCheckbox(options) {
    let slot = 0;
    options.forEach((option, index) => {
      if (option.schedule[slot] == 0) slot++;
      $('.select-option[data-slot="' + slot + '"]').append('<option value="' + index + '">' + option.name + '</option>');
    });
  }

  /*
  * Load a course
  */
  function loadCourse(index, type, course) {
    for (let i = 0; i < nbDay * nbSlotPerDay; i++) {
      if (course.schedule[i]) {
        addSlot(index, i, type, course.name);
      }
    }
  }

  /*
  * Unload a course
  */
  function removeOptionSlot(slot) {
    $('td[slot="' + slot + '"] > .option').remove();
  }

  /*
  * Unload a course
  */
  function unloadCourse(index, type) {
    $('.' + type + '-' + index).remove();
  }

  /*
  * Add a course slot
  */
  function addSlot(index, slot, type, name) {
    $('td[slot="' + slot + '"]').append('<div class="event cours ' + type + ' ' + type + '-' + index + '">' + name + '</div>');
    if (type == 'mineur') {
      $('.select-option[data-slot="' + slot + '"]').each(function() {
        let select = $(this);
        if (select.val() != '') {
          select.val('');
          removeOptionSlot(slot);
        }
        select.attr('disabled', 'disabled')
      });
    }
  }
})();
