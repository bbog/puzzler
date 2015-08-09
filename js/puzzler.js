
initFirstStep();




          


          function createImageParts (imageData) {

            var canvas = document.createElement('canvas');

          }

          

          // read image

          // split image into equal parts inside the canvas

          // generate canvas images

          // place canvas images inside the puzzle




          var container = document.getElementById('container');
            var mc = new Hammer(container);

            Hammer.defaults.domEvents = true;

            var width  = parseInt(container.clientWidth, 10),
                height = parseInt(container.clientHeight, 10),
                x = parseInt(container.offsetLeft, 10),
                y = parseInt(container.offsetTop, 10);

            mc.on("pan", function(ev) {

              if (ev.srcEvent.target.className.indexOf('corner') === -1) {

                container.style.left = x + ev.deltaX + 'px';
                container.style.top  = y + ev.deltaY + 'px';
              }
            });

            mc.on("panend", function(ev) {

                x = parseInt(container.offsetLeft, 10),
                y = parseInt(container.offsetTop, 10);
            });

            var corner = document.getElementById('corner');
            cornerMc = new Hammer(corner);

            cornerMc.on('pan', function (ev) {
                container.style.width  = width + ev.deltaX + 'px';
                container.style.height = height + ev.deltaY + 'px';
            });