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
function changeLinkColor(color: string) {
    // Store the color in localStorage
    localStorage.setItem('linkColor', color);

    // Apply the color to all <a> tags immediately
    applyStoredLinkColor();
}

// Function to retrieve color from localStorage and apply it
function applyStoredLinkColor(): void {
    const storedColor = localStorage.getItem('linkColor');
    if (storedColor) {
        // Select all <a> tags on the page
        const links = document.getElementsByTagName('a');

        // Iterate through each <a> tag and change its color
        for (let i = 0; i < links.length; i++) {
            links[i].style.color = storedColor;
        }
    }
}

// Apply stored color on page load
applyStoredLinkColor();

let baseColor: string

function swapColor(): void { 
    if (baseColor == 'greenyellow') {
        baseColor = 'blue'
        changeLinkColor('blue')
    } else {
        baseColor = 'greenyellow'
        changeLinkColor('greenyellow')
    }
}

//Slideshow functions 

let slideIndex = 1;

function plusSlides(n:number) {
  showSlides(slideIndex += n);
}

function currentSlide(n:number) {
  showSlides(slideIndex = n);
}

function showSlides(n: number): void {
    const slides: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("slide") as HTMLCollectionOf<HTMLElement>;
  
    // Check if slides collection is empty
    if (slides.length === 0) return;
  
    // Adjust slideIndex if out of bounds
    if (n > slides.length) {
      slideIndex = 1;
    } else if (n < 1) {
      slideIndex = slides.length;
    }
  
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  
    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

  }
  
