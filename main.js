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
