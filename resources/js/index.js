(function() {
  "use strict";

  let nbDay = 5;
  let nbSlotPerDay = 2;
  let minors, options;

  $(document).ready(function() {

    loadPart(1);

    //Choosing part
    $('#select-part').change(function() {
      loadPart($(this).val());
    });

    //Choosing minor
    $('#select-minor').change(function() {
      $('.minor').remove();
      $('.select-option').removeAttr('disabled');
      if (this.value != '') addCourse(this.value, 'minor', minors[this.value]);
    });

    //Choosing option
    $('.select-option').change(function() {
      let slot = $(this).data('slot');
      removeOptionSlot(slot);
      if (this.value != '') addCourse(this.value, 'option', options[this.value]);
    });
  });

  /*
  * Loading part
  */
  function loadPart(index) {
    //reseting infos
    let choosed_minor = $('#select-minor').val();
    $('#select-minor > option:not(:first-child)').remove();
    $('.select-option > option:not(:first-child)').remove();
    $('.select-option').removeAttr('disabled');
    $('.event').remove();

    //Loading minors and options
    let part = index;
    minors = $.parseJSON(minors_data)[part];
    loadMinorSelect(minors);
    options = $.parseJSON(options_data)[part];
    loadOptionSelect(options);

    //Keep choosed minor
    $('#select-minor').val(choosed_minor).change();
  }

  /*
  * Loading minor select
  */
  function loadMinorSelect(minors) {
    minors.forEach((minor, index) => {
      $('#select-minor').append('<option value="' + index + '">' + minor.name + '</option>');
    });
  }

  /*
  * Loading options selects
  */
  function loadOptionSelect(options) {
    let slot = 0;
    options.forEach((option, index) => {
      if (option.schedule[slot] == 0) slot++;
      $('.select-option[data-slot="' + slot + '"]').append('<option value="' + index + '">' + option.name + '</option>');
    });
  }

  /*
  * Load a course
  */
  function addCourse(index, type, course) {
    for (let i = 0; i < nbDay * nbSlotPerDay; i++) {
      if (course.schedule[i]) {
        addCourseSlot(index, i, type, course.name);
      }
    }
  }

  /*
  * Add a course slot
  */
  function addCourseSlot(index, slot, type, name) {
    $('td[slot="' + slot + '"]').append('<div class="event cours ' + type + ' ' + type + '-' + index + '">' + name + '</div>');
    if (type == 'minor') {
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

  /*
  * Remove a course
  */
  function removeOptionSlot(slot) {
    $('td[slot="' + slot + '"] > .option').remove();
  }
})();
