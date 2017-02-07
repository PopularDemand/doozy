doozy.directive('droppable', function() {
  return {
    scope: {
      drop: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];

      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
              // allows us to drop
              if (e.preventDefault) e.preventDefault();
              this.classList.add('over');
              return false;
            },
            false
            );

      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
        );

      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
        );

      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();

          this.classList.remove('over');

          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);

          scope.drop(item);

          return false;
        },
        false
        );
    }
  }
});