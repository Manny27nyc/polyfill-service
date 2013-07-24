// Element.prototype.classList
Element.polyfill.push(function () {
	var element = this, DOMTokenList = function DOMTokenList() {
		this._element = element;
	}, name = String(element.className).trim(), list;

	DOMTokenList.prototype = window.DOMTokenList.prototype;

	list = element.classList = new DOMTokenList();

	if (name) {
		Array.prototype.push.apply(list, name.split(/\s+/));
	}

	element.attachEvent('onpropertychange', function () {
		if (element.className !== list.toString()) {
			var array = element.className.trim().split(/\s+/);

			Array.prototype.splice.apply(list, [0, list.length].concat(array[0] ? array : []));
		}
	});
});