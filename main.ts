// Function to display text one character at a time with a delay
function displayTextStaggered(text: string, targetDiv: string, delay: number, startDelay: number = 0): void {
    setTimeout(() => {
        let index = 0;
        // Interval to display characters with a delay
        const interval = setInterval(() => {
            if (index === text.length) {
                clearInterval(interval); // Stop the interval when text is fully displayed
            } else {
                const targetElement = document.getElementById(targetDiv);
                if (targetElement) {
                    targetElement.innerHTML += text.charAt(index);
                    index++;
                }
            }
        }, delay);
    }, startDelay);
}

// Function to replace text in a div with a delay, checking for existence of the target text
function replaceTextInDiv(divId: string, search: string, replacement: string, delay: number): void {
    const div = document.getElementById(divId);
    if (div) {
        const content = div.innerHTML;
        // Check if the target text exists in the content
        if (content.includes(search)) {
            div.innerHTML = content.replace(new RegExp(search, 'g'), replacement); // Replace the target text
        } else {
            setTimeout(() => {
                replaceTextInDiv(divId, search, replacement, delay); // Try again after the delay
            }, delay);
        }
    }
}