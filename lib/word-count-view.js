module.exports = WordCountView = function WordCountView(serializeState) {
  var message;
  this.element = document.createElement('div');
  this.element.classList.add('word-count');
  message = document.createElement('div');
  message.classList.add('message');
  this.element.appendChild(message);
}

WordCountView.prototype.serialize = function() {};

WordCountView.prototype.destroy = function() {
  return this.element.remove();
};

WordCountView.prototype.getElement = function() {
  return this.element;
};

WordCountView.prototype.setCount = function(count) {
  var displayText;
  displayText = count + " words.";
  return this.element.children[0].textContent = displayText;
};
