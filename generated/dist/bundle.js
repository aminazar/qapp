require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"app":[function(require,module,exports){
// Copyright (c) 2015-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	exports.initialize = function initialize(options) {
		checkOption(options.tabs, "options.tabs");
		checkOption(options.content, "options.content");
		checkOption(options.defaultTab, "options.defaultTab");
		checkOption(options.activeTabClass, "options.activeTabClass");
		checkOption(options.hiddenContentClass, "options.hiddenContentClass");

		handleClicks(options);
		showTab(options.defaultTab, options);
	};

	function handleClicks(options) {
		options.tabs.forEach(function(tabElement) {
			tabElement.addEventListener("click", function() {
				showTab(tabElement, options);
			});
		});
	}

	function showTab(tabToShow, options) {
		var activeIndex = findIndex(options.tabs, tabToShow);
		var contentToShow = options.content[activeIndex];

		options.tabs.forEach(function(element) {
			element.classList.remove(options.activeTabClass);
		});
		tabToShow.classList.add(options.activeTabClass);

		options.content.forEach(function(element) {
			element.classList.add(options.hiddenContentClass);
		});
		contentToShow.classList.remove(options.hiddenContentClass);
	}

	function findIndex(contentTabs, tabToShow) {
		for (var i = 0; i < contentTabs.length; i++) {
			if (contentTabs[i] === tabToShow) return i;
		}
		throw new Error("Could not find tab to show: " + tabToShow.outerHTML);
	}

	function checkOption(option, name) {
		if (option === undefined) throw new Error("Expected " + name);
	}

}());
},{}]},{},[]);
