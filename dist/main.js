"use strict";
// Function to display text one character at a time with a delay
function displayTextStaggered(text, targetDiv, delay, startDelay) {
    if (startDelay === void 0) { startDelay = 0; }
    setTimeout(function () {
        var index = 0;
        // Interval to display characters with a delay
        var interval = setInterval(function () {
            if (index === text.length) {
                clearInterval(interval); // Stop the interval when text is fully displayed
            }
            else {
                var targetElement = document.getElementById(targetDiv);
                if (targetElement) {
                    targetElement.innerHTML += text.charAt(index);
                    index++;
                }
            }
        }, delay);
    }, startDelay);
}
// Function to replace text in a div with a delay, checking for existence of the target text
function replaceTextInDiv(divId, search, replacement, delay) {
    var div = document.getElementById(divId);
    if (div) {
        var content = div.innerHTML;
        // Check if the target text exists in the content
        if (content.includes(search)) {
            div.innerHTML = content.replace(new RegExp(search, 'g'), replacement); // Replace the target text
        }
        else {
            setTimeout(function () {
                replaceTextInDiv(divId, search, replacement, delay); // Try again after the delay
            }, delay);
        }
    }
}
function changeLinkColor(color) {
    // Store the color in localStorage
    localStorage.setItem('linkColor', color);
    // Apply the color to all <a> tags immediately
    applyStoredLinkColor();
}
// Function to retrieve color from localStorage and apply it
function applyStoredLinkColor() {
    var storedColor = localStorage.getItem('linkColor');
    console.log(storedColor);
    if (storedColor) {
        // Select all <a> tags on the page
        var links = document.getElementsByTagName('a');
        // Iterate through each <a> tag and change its color
        for (var i = 0; i < links.length; i++) {
            links[i].style.color = storedColor;
        }
    }
}
// Apply stored color on page load
applyStoredLinkColor();
var baseColor;
function swapColor() {
    if (baseColor == 'greenyellow') {
        baseColor = 'blue';
        changeLinkColor('blue');
    }
    else {
        baseColor = 'greenyellow';
        changeLinkColor('greenyellow');
    }
}
