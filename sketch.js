var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, 0);
    streams.push(stream);
    x += symbolSize
  }

  textFont('Bookshelf Symbol 7');
  textSize(symbolSize);
}

function draw() {
  background(0);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.opacity = opacity;

  this.switchInterval = round(random(1,5));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 50));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {

        this.value = String.fromCharCode(
          0x30A0 + floor(random(0, 100))
        );
      } else {
        this.value = floor(random(0,10));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 22);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(10, 255, 10, symbol.opacity);
      } else {
        fill(20, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}

