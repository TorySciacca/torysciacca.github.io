const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const confirmButton = document.getElementById('confirm');

const totalCategories = 6;

//Prompt objects are stored as follows: {[p:'',o:'',w:'',a:'',n:'',r:'','spade':'a'],..}

let previousPrompts = [];
let promptNo = 0;
let totalSkips = 0;
const maxSkips = 2;
let score = 0;

//players
const newPlayer = document.getElementById('addPlayer')
const removePlayer = document.getElementById('removePlayer')
let noPlayers = 1
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')
const p3 = document.getElementById('p3')
const p4 = document.getElementById('p4')
const p5 = document.getElementById('p5')

document.body.style.overflow = 'hidden'; //disable scroll

newPlayer.addEventListener('click', function() {
    if (noPlayers < 5){
        console.log(noPlayers)
        noPlayers++
    switch (noPlayers) {
        case 2: p2.hidden = false; break;
        case 3: p3.hidden = false; break;
        case 4: p4.hidden = false; break;
        case 5: p5.hidden = false; break;
    } 
}})

removePlayer.addEventListener('click', function() {
    if (noPlayers > 1){
        noPlayers--
    switch (noPlayers) {
        case 1: p2.hidden = true; break;
        case 2: p3.hidden = true; break;
        case 3: p4.hidden = true; break;
        case 4: p5.hidden = true; break;
    } 
}})

const maxScore = 49 // according to Articulate board

const colorOrder = ['deepskyblue','orange','white','royalblue','gold','red','seagreen'] // according to Articulate board

function updatePlayer(playerNo, increment = 1){
    let currentScore = parseInt(document.getElementById('p'+playerNo).innerText)
    if (currentScore + increment < maxScore && currentScore + increment > 0){
        document.getElementById('p'+playerNo).innerText = parseInt(document.getElementById('p'+playerNo).innerText) + increment
        document.getElementById('p'+playerNo).style.backgroundColor = colorOrder[(document.getElementById('p'+playerNo).innerText-1)%colorOrder.length]
        if (document.getElementById('p'+playerNo).style.backgroundColor == 'white'){document.getElementById('p'+playerNo).innerText = document.getElementById('p'+playerNo).innerText + ' ♠'; }
    }
    if (currentScore + increment == maxScore){
        document.getElementById('p'+playerNo).style.backgroundColor = 'black'
        document.getElementById('p'+playerNo).innerText = `P${playerNo} WINS`
        document.getElementById('p'+playerNo).style.color = 'white'
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());

for (let i = 1; i <= 5; i++) {
    document.getElementById('p' + i).addEventListener('click', function() {
        updatePlayer(i);
    });

    document.getElementById('p' + i).addEventListener("contextmenu", function(event) {
        updatePlayer(i, -1);
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === String(i)) {
            updatePlayer(i);
        }
    });
}

const prompts = [
    'p',
    'w',
    'o',
    'a',
    'n',
    'r'
]

let timer = document.querySelector('.timer');
const timerLength = 30;
let timeRemaining = timerLength;
let timerRunning = false;


function formatTime(time) {
    //const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    //const milliseconds = Math.floor((time * 1000) % 1000);
    return `${seconds.toString().padStart(2, '0')}`;

}

function disableButtons(isTimerRunning) {
    if (isTimerRunning) {
        startButton.disabled = true;
        resetButton.disabled = true;
        pauseButton.disabled = false;
        pauseButton.disabled = false;
        nextButton.disabled = false;
        prevButton.disabled = false;
        confirmButton.disabled = false;
    }
    else {
        startButton.disabled = false;
        resetButton.disabled = false;
        pauseButton.disabled = true;
        pauseButton.disabled = true;
        nextButton.disabled = true;
        prevButton.disabled = true;
        confirmButton.disabled = true;
    }
}

function countDown() {
    timeRemaining -= 1;
    timer.innerHTML = formatTime(timeRemaining);
    if (timeRemaining <= 0) {
        timer.innerHTML = formatTime(0);
        timerRunning = false;
        resetTimer();
        disableButtons(timerRunning);
    }
}

function resetTimer() {
    timeRemaining = timerLength;
    timer.innerHTML = formatTime(timeRemaining);
    previousPrompts = [];
    promptNo = 0;
    totalSkips = 0;
    previousPrompts = [];
    resetPrompts()
    score = 0;
}

function loadPrompts(generateNew){
    if (generateNew){
        loadCategories()
        let spade = pickSpade()
        previousPrompts[promptNo] = savePrompt(spade)
    }else{
        for (let i = 0; i < totalCategories+1; i++){
            if (i != totalCategories){
                document.getElementById(prompts[i]).innerText = previousPrompts[promptNo][i]
            } else { //spade
                document.getElementById(prompts[previousPrompts[promptNo][i]]+"Spade").innerText = '♠'
             }

        } 
    }
}

function loadCategories(){
    for (let i = 0; i < totalCategories; i++) {
        document.getElementById(prompts[i]).innerText = promptLibrary[prompts[i]][Math.floor(Math.random() * promptLibrary[prompts[i]].length)]
    } 

}

function savePrompt(spadePos){
    let currentPrompt = []
    for (i = 0; i < totalCategories; i++){
        currentPrompt.push(document.getElementById(prompts[i]).innerText)
    }
    currentPrompt.push(spadePos)
    return currentPrompt
}

function resetPrompts(){
    for (let i = 0; i < totalCategories; i++){
        document.getElementById(prompts[i]).innerText =''
        document.getElementById(prompts[i]+'Spade').innerText =''
    }
}

function pickSpade(){
    const randomNumber = Math.floor(Math.random() * totalCategories);
    document.getElementById(prompts[randomNumber]+'Spade').innerText = '♠'
    for(i = 0; i < totalCategories; i++){
        if (i != randomNumber){
            document.getElementById(prompts[i]+'Spade').innerText = ''
        }
    }
    return randomNumber
}

function clearSpade(){
    if (previousPrompts.length > 0 ){
        document.getElementById(prompts[previousPrompts[promptNo][totalCategories]]+"Spade").innerText = ''}
}

function displayScore(){ //
    document.getElementById('score').innerText = `Score: ${score} Skips: ${totalSkips}`;
}


// Buttons -- Event Listeners

function startAction(){
    if (timerRunning) {return}
    if (timeRemaining != 30){
        //resume
        loadPrompts(false);
    } else{
        loadPrompts(true);
    }
    timerRunning = true;
    disableButtons(timerRunning);
    displayScore();
}

startButton.addEventListener('click', function() {
    startAction()
});

resetButton.addEventListener('click', function() {
    resetTimer();
});

function pauseAction(){
    timerRunning = false;
    resetPrompts()
    disableButtons(timerRunning);
}

pauseButton.addEventListener('click', function() {
    pauseAction()
});

//Prev/Next

function previousAction() {
    if (promptNo > 0){
        clearSpade()
        promptNo--
        loadPrompts(false)
        displayScore()
    }
};

prevButton.addEventListener('click', function() {
    previousAction()
});

function nextAction() {
    if (promptNo == previousPrompts.length - 1){  //skiping to new prompt
        if (totalSkips < maxSkips) {
            clearSpade()
            promptNo++
            totalSkips++
            loadPrompts(true) 
            displayScore()
        }
    } else { // loading next prompt
        clearSpade()
        promptNo++
        loadPrompts(false)
        displayScore()
    }
}

nextButton.addEventListener('click', function() {
    nextAction()
})


//Confirm

function confirmSelection() {
    score++
    loadPrompts(true)
    displayScore()
}

confirmButton.addEventListener('click', function() {
    confirmSelection()
})

//Keyboard controls as per Iain's request
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'Enter': 
            if (!timerRunning){ startAction()
            } else {confirmSelection()}
            break;
        case 'Escape':
            if (timerRunning){pauseAction()}
            else{resetTimer()};
            break;
        case 'ArrowLeft'://left 39 right
            previousAction()
            break;
        case 'ArrowRight':
            nextAction()
            break;
            }
        });

//Initialize
resetPrompts()
disableButtons(timerRunning)

//Main Loop -- runs every second
setInterval(() => {
    if (timerRunning) {
        disableButtons(timerRunning);
        countDown()
    }
}, 1000);

//Data 
const promptLibrary = {
    "p": [
        "Albert Einstein",
        "Mark Twain",
        "Oscar Wilde",
        "Elon Musk",
        "Mahatma Gandhi",
        "Nelson Mandela",
        "Stephen Fry",
        "David Attenborough",
        "Socrates",
        "Confucius",
        "Plato",
        "Aristotle",
        "Julius Caesar",
        "Napoleon Bonaparte",
        "Winston Churchill",
        "Abraham Lincoln",
        "George Washington",
        "Barack Obama",
        "Donald Trump",
        "Richard Nixon",
        "Alexander the Great",
        "Homer",
        "Charles Darwin",
        "Galileo Galilei",
        "Isaac Newton",
        "Leonardo da Vinci",
        "Karl Marx",
        "Sigmund Freud",
        "Nancy Cartwright",
        "Cathy Freeman",
        "Helen Keller",
        "Patrick Bateman",
        "Marilyn Monroe",
        "Sylvia Plath",
        "Steve Irwin",
        "Malala Yousafzai",
        "Greta Thunberg",
        "Augustus Caesar",
        "Bob Hawke",
        "Kevin Rudd",
        "Sir John Monash",
        "Judy Garland",
        "Matthew Flinders",
        "Stephen Hawking",
        "Gough Whitlam",
        "Harold Holt",
        "John F. Kennedy",
        "John Lennon",
        "Paul McCartney",
        "George Harrison",
        "Ringo Starr",
        "Elvis Presley",
        "Michael Jackson",
        "Barack Obama",
        "George W. Bush",
        "Bill Clinton",
        "George H. W. Bush",
        "Ronald Reagan",
        "Jimmy Carter",
        "Gwen Stefani",
        "Tony Abbott",
        "Julia Gillard",
        "John Howard",
        "Paul Keating",
        "Malcolm Fraser",
        "William McMahon",
        "John Gorton",
        "Robert Menzies",
        "Frank Forde",
        "Arthur Fadden",
        "Robert Gordon Menzies",
        "Earle Page",
        "Stanley Bruce",
        "James Scullin",
        "Stanley Bruce",
        "James Scullin",
        "Andrew Fisher",
        "Joseph Cook",
        "Andrew Fisher",
        "Alfred Deakin",
        "Andrew Fisher",
        "Alfred Deakin",
        "George Reid",
        "Alfred Deakin",
        "Chris Watson",
        "George Reid",
        "Edmund Barton",
        "Tom Hanks",
        "Meryl Streep",
        "Jack Nicholson",
        "Katharine Hepburn",
        "Daniel Day-Lewis",
        "Ingrid Bergman",
        "Marlon Brando",
        "Judi Dench",
        "Anthony Hopkins",
        "Emma Thompson",
        "John Wayne",
        "Vivien Leigh",
        "Elizabeth Taylor",
        "Martin Landau",
        "Sean Connery",
        "Gene Hackman",
        "Jack Lemmon",
        "Shirley MacLaine",
        "Robert De Niro",
        "Laurence Olivier",
        "Vanessa Redgrave",
        "Jon Voight",
        "Jane Fonda",
        "Art Carney",
        "Sophia Loren",
        "Rod Steiger",
        "Paul Newman",
        "Joanne Woodward",
        "Charlton Heston",
        "Anne Bancroft",
        "Tony Curtis",
        "Ernest Borgnine",
        "Olivia de Havilland",
        "Yul Brynner",
        "Patricia Neal",
        "David Niven",
        "Susan Hayward",
        "Fredric March",
        "Spencer Tracy",
        "Luise Rainer",
        "Victor McLaglen",
        "Norma Shearer",
        "Clark Gable",
        "Ginger Rogers",
        "James Cagney",
        "Ingrid Bergman",
        "Ivan Milat",
        "Marilyn Manson",
        "Fall Out Boy",
        "Thom Yorke",
        "Radiohead",
        "Ed Sheeran",
        "Kanye West",
        "Tame Impala",
        "The Beatles",
        "The Rolling Stones",
        "Led Zeppelin",
        "Daft Punk",
        "Gorillaz",
        "King Gizzard and the Lizard Wizard",
        "Black Country New Road",
        "Geordie Greep",
        "Daniel Radcliffe",
        "Emma Watson",
        "Rupert Murdoch",
        "Mark Zuckerberg",
        "Tim Cook",
        "Bill Gates",
        "Jeff Bezos",
        "Jeffrey Epstein",
        "Melania Trump",
        "Barron Trump",
        "Joe Biden",
        "Bernie Sanders",
        "Dave Hughes",
        "The Wiggles",
        "AC/DC",
        "Gotye",
        "Kendrick Lamar",
        "Drake",
        "The Weeknd",
        "Lil Nas X",
        "Nicki Minaj",
        "Jay-Z",
        "Snoop Dogg",
        "Eminem",
        "Lil Wayne",
        "Walter White",
        "Tony Soprano",
        "Michael Corleone",
        "Johnny Depp",
        "Leonardo DiCaprio",
        "Brad Pitt",
        "Tom Hanks",
        "Robert Downey Jr.",
        "Scarlett Johansson",
        "Chadwick Boseman",
        "Tom Cruise",
        "Arnold Schwarzenegger",
        "Will Smith",
        "Harrison Ford",
        "Samuel L. Jackson",
        "John Travolta",
        "Quentin Tarantino",
        "Christopher Nolan",
        "Steven Spielberg",
        "Martin Scorsese",
        "Peter Jackson",
        "James Cameron",
        "Alfred Hitchcock",
        "Ridley Scott",
        "Justice",
        "Korn",
        "Incubus",
        "Johann Sebastian Bach",
        "Wolfgang Amadeus Mozart",
        "Ludwig van Beethoven",
        "J.K. Rowling",
        "J.R.R. Tolkien",
        "George Orwell",
        "Jane Austen",
        "Charles Dickens",
        "Virginia Woolf",
        "F. Scott Fitzgerald",
        "Ernest Hemingway",
        "Ray Bradbury",
        "Kurt Vonnegut",
        "George R. R. Martin",
    ],
    "w":[
        "Broadway",
        "Mount Everest",
        "Grand Canyon",
        "Eiffel Tower",
        "Great Barrier Reef",
        "Machu Picchu",
        "Sahara Desert",
        "Amazon Rainforest",
        "Victoria Falls",
        "Antarctica",
        "Niagara Falls",
        "Galapagos Islands",
        "Serengeti",
        "Petra",
        "Acropolis",
        "Stonehenge",
        "Christ the Redeemer",
        "Angkor Wat",
        "Burj Khalifa",
        "Colosseum",
        "Taj Mahal",
        "Louvre Museum",
        "Golden Gate Bridge",
        "Central Park",
        "Alhambra",
        "Kilimanjaro",
        "Loch Ness",
        "Statue of Liberty",
        "Sistine Chapel",
        "Giza Pyramids",
        "Hagia Sophia",
        "Big Ben",
        "Tower of London",
        "Buckingham Palace",
        "Sydney Opera House",
        "Forbidden City",
        "Mount Fuji",
        "Santorini",
        "Vatican City",
        "Venice Canals",
        "Neuschwanstein Castle",
        "The Colosseum",
        "Great Rift Valley",
        "Yellowstone National Park",
        "Matterhorn Mountain",
        "Plitvice Lakes National Park",
        "Mount Rushmore",
        "Giant's Causeway",
        "Old City of Dubrovnik",
        "Bora Bora",
        "Zion National Park",
        "Cathedral of Notre Dame",
        "Grand Teton National Park",
        "Cape of Good Hope",
        "Easter Island",
        "Cinque Terre",
        "Plaza de Espana",
        "Bali Water Palace",
        "Kata Tjuta",
        "Mont St. Michel",
        "Bryce Canyon National Park",
        "Sagano Bamboo Forest",
        "Halong Bay",
        "Arches National Park",
        "Gobi Desert",
        "Coral Reef",
        "Cape Town",
        "Red Square",
        "St. Basil's Cathedral",
        "The Vatican",
        "Australia",
        "New Zealand",
        "United States",
        "United Kingdom",
        "Canada",
        "China",
        "Japan",
        "India",
        "Indonesia",
        "Germany",
        "France",
        "Italy",
        "Spain",
        "Brazil",
        "Russia",
        "South Korea",
        "South Africa",
        "Thailand",
        "Vietnam",
        "Philippines",
        "Malaysia",
        "Singapore",
        "Greece",
        "Netherlands",
        "Sweden",
        "Switzerland",
        "Ireland",
        "Norway",
        "Denmark",
        "Poland",
        "Turkey",
        "Saudi Arabia",
        "Mexico",
        "Argentina",
        "Chile",
        "Peru",
        "Colombia",
        "Egypt",
        "United Arab Emirates",
        "Qatar",
        "Israel",
        "Portugal",
        "Belgium",
        "Austria",
        "Czech Republic",
        "Finland",
        "Hungary",
        "Romania",
        "Ukraine",
        "Pakistan",
        "Bangladesh",
        "Sri Lanka",
        "Nepal",
        "Myanmar (Burma)",
        "Cambodia",
        "Laos",
        "Fiji",
        "Papua New Guinea",
        "Solomon Islands",
        "Samoa",
        "Tonga",
        "Vanuatu",
        "Tuvalu",
        "Micronesia",
        "Palau",
        "Kiribati",
        "Nauru",
        "Marshall Islands",
        "Timor-Leste",
        "Sydney",
        "New York",
        "London",
        "Paris",
        "Tokyo",
        "Rome",
        "Los Angeles",
        "Berlin",
        "Madrid",
        "Bangkok",
        "Singapore",
        "Hong Kong",
        "Beijing",
        "Shanghai",
        "Dubai",
        "Istanbul",
        "Kuala Lumpur",
        "Jakarta",
        "Seoul",
        "Mumbai",
        "Mexico City",
        "Sao Paulo",
        "Buenos Aires",
        "Rio De Janeiro",
        "Cairo",
        "Johannesburg",
        "Lagos",
        "Moscow",
        "St Petersburg",
        "Budapest",
        "Prague",
        "Vienna",
    ]
    ,
    "o": [
        "Mop", 
        "Apple", 
        "Broom",
        "Toilet Roll",
        "Window",
        "Ski Lift",
        "Thongs",
        "Pool",
        "Bonfire",
        "Candle",
        "Bunsen Burner",
        "Toaster",
        "Fridge",
        "Washer",
        "Dryer",
        "Sink",
        "Catalogue",
        "Cupboard",
        "Cabinet",
        "Table",
        "Chair",
        "Bed",
        "Sofa",
        "Couch",
        "Armchair",
        "Lamp",
        "Mirror",
        "Curtains",
        "Door",
        "Window",
        "Hose",
        "Gloves",
        "Shoes",
        "Pants",
        "Shirt",
        "Wire",
        "Cable",
        "Screw",
        "Nails",
        "Screwdriver",
        "Hammer",
        "Saw",
        "Drill",
        "Vase",
        "Bowl",
        "Cup",
        "Plate",
        "Spoon",
        "Fork",
        "Knife",
        "Sword",
        "Magazine",
        "Newspaper",
        "Book",
        "Journal",
        "Dictionary",
        "Encyclopedia",
        "Atlas",
        "Compass",
        "Map",
        "Globe",
        "Clock",
        "Telescope",
        "Calculator",
        "Telephone",
        "Pager",
        "Computer",
        "Calculator",
        "Printer",
        "Scissors",
        "Glue",
        "Tape",
        "Pencil",
        "Pen",
        "Eraser",
        "Ruler",
        "Pencil Case",
        "File",
        "Folder",
        "Paper Clip",
        "Stapler",
        "Staples",
        "Tacks",
        "Pin",
        "Needle",
        "Thread",
        "Yarn",
        "Fabric",
        "Sewing Machine",
        "Vacuum",
        "Broom",
        "Duster",
        "Mop",
        "Buckket",
        "Soap",
        "Toilet Brush",
        "Toilet Paper",
        "Toothbrush",
        "Toothpaste",
        "Shower",
        "Shampoo",
        "Conditioner",
        "Towel",
        "Washing Machine",
        "Dryer",
        "Iron",
        "Ironing Board",
        "Frying Pan",
        "Saucepan",
        "Oven",
        "Stove",
        "Refridgerator",
        "Freezer",
        "Dishwasher",
        "Microwave",
        "Blender",
        "Toaster",
        "Kettle",
        "Coffee Machine",
        "Tea Infuser",
        "Teapot",
        "Cups",
        "Saucers",
        "Plates",
        "Bowls",
        "Cutlery",
        "Glass",
        "Jug",
        "Bottle Opener",
        "Can Opener",
    ],
    "a": [
        "Running", 
        "Jumping", 
        "Stealing", 
        "Swimming", 
        "Sitting", 
        "Sleeping",
        "Accommodating",
        "Dancing",
        "Singing",
        "Writing",
        "Reading",
        "Painting",
        "Drawing",
        "Cooking",
        "Singing",
        "Dancing",
        "Canoeing",
        "Climbing",
        "Swimming",
        "Sleeping",
        "Sailing",
        "Skiing",
        "Coughing",
        "Laughing",
        "Screaming",
        "Crying",
        "Hugging",
        "Kissing",
        "Punching",
        "Kicking",
        "Slapping",
        "Thumping",
        "Slapping",
        "Arranging",
        "Cooking",
        "Dancing",
        "Singing",
        "Writing",
        "Reading",
        "Painting",
        "Drawing",
        "Wrestling",
        "Golfing",
        "Fishing",
        "Gardening",
        "Sailing",
        "Playing",
        "Hiking",
        "Cycling",
        "Knitting",
        "Crocheting",
        "Sewing",
        "Embroidering",
        "Pottery",
        "Crafting",
        "Painting",
        "Drawing",
        "Sculpting",
        "Photography",
        "Filmaking",
        "Playing",
        "Jumping",
        "Running",
        "Walking",
        "Hiking",
        "Cycling",
        "Swimming",
        "Sailing",
        "Dancing",
        "Singing",
        "Writing",
        "Reading",
        "Typing",
        "Coding",
        "Designing",
        "Programming",
        "Debugging",
        "Testing",
        "Releasing",
        "Marketing",
        "Selling",
        "Buying",
        "Shopping",
        "Cooking",
        "Baking",
        "Grilling",
        "Roasting",
        "Frying",
        "Boiling",
        "Steaming",
        "Stirring",
        "Mixing",
        "Measuring",
        "Cutting",
        "Peeling",
        "Chopping",
        "Dicing",
        "Mincing",
        "Whipping",
        "Beating",
        "Stirring",
        "Blending",
        "Pouring",
        "Serving",
        "Presenting",
        "Photographing",
        "Filming",
        "Editing",
        "Composing",
        "Directing",
        "Producing",
        "Starring",
    ],
    "n": [
        "Leaves", 
        "Gumtree", 
        "Koala", 
        "Lizard", 
        "Mango", 
        "Pineapple", 
        "Quokka", 
        "Rabbit", 
        "Snake", 
        "Tiger", 
        "Zebra",
        "Aardvark",
        "Sunflower",
        "Daisy",
        "Butterfly",
        "Bee",
        "Honey",
        "Bird",
        "Fish",
        "Shark",
        "Octopus",
        "Crab",
        "Lobster",
        "Prawn",
        "Oyster",
        "Pearl",
        "Seaweed",
        "Jellyfish",
        "Starfish",
        "Seahorse",
        "Turtle",
        "Frog",
        "Toad",
        "Sparrow",
        "Finch",
        "Robin",
        "Bluebird",
        "Hummingbird",
        "Parrot",
        "Kookaburra",
        "Emu",
        "Kangaroo",
        "Wallaby",
        "Wombat",
        "Possum",
        "Echidna",
        "Platypus",
        "Goanna",
        "Lizard",
        "Snake",
        "Spider",
        "Scorpion",
        "Centipede",
        "Ant",
        "Grasshopper",
        "Caterpillar",
        "Butterfly",
        "Moth",
        "Flower",
        "Tree",
        "Rock",
        "Mountain",
        "River",
        "Ocean",
        "Beach",
        "Desert",
        "Forest",
        "Jungle",
        "Swamp",
        "Bog",
        "Mist",
        "Fog",
        "Cloud",
        "Rain",
        "Snow",
        "Sun",
        "Moon",
        "Stars",
        "Planet",
        "Galaxy",
        "Space",
        "Aurora",
        "Comet",
        "Meteor",
        "Shooting Star",
        "Boab",
        "Banksia",
        "Waratah",
        "Eucalyptus",
        "Kakadu Plum",
        "Grevillea",
        "Hakea",
        "Jacaranda",
        "Gum Leaf",
        "Bottlebrush",
        "Lilly Pilly",
        "Tasmanian Devil",
        "Quoll",
        "Sugar Glider",
        "Tawny Frogmouth",
        "Eastern Blue Tongue",
        "Bearded Dragon",
        "Frill-necked Lizard",
        "Perentie",
        "Emu Wren",
        "Weebill",
        "Crimson Rosella",
        "Sulphur-crested Cockatoo",
        "Australian Pelican",
        "Great Barrier Reef",
        "The Great Ocean Road",
        "The Blue Mountains",
        "The Pinnacles Desert",
        "The Kimberley",
        "The Outback",
        "The Red Centre",
        "The Whitsunday Islands",
        "The Great Dividing Range",
        "Lion",
        "Elephant",
        "Giraffe",
        "Zebra",
        "Monkey",
        "Gorilla",
        "Kangaroo",
        "Penguin",
        "Koala",
        "Crocodile",
        "Snake",
        "Shark",
        "Tiger",
        "Bear",
        "Wolf",
        "Dog",
        "Cat",
        "Horse",
        "Cow",
        "Pig",
        "Sheep",
        "Goat",
        "Chicken",
        "Duck",
        "Turkey",
        "Rabbit",
        "Deer",
        "Frog",
        "Toad",
        "Butterfly",
        "Bee",
        "Bat",
        "Sparrow",
        "Owl",
        "Raven",
        "Crow",
        "Hawk",
        "Falcon",
        "Eagle",
        "Ostrich",
        "Emu",
        "Kookaburra",
        "Tortoise",
        "Turtle",
        "Alligator",
        "Cheetah",
        "Hyena",
        "Leopard",
        "Jaguar",
        "Puma",
        "Rattlesnake",
        "Octopus",
        "Squid",
        "Seal",
        "Walrus",
    ],
    "r": [
        "Cock", 
        "Balls", 
        "Pussy",
        "Aardvark",
        "Acorn",
        "Astronaut",
        "Avocado",
        "Bicycle",
        "Binoculars",
        "Bubblegum",
        "Butterfly",
        "Cactus",
        "Camera",
        "Candle",
        "Castle",
        "Computer",
        "Cowboy",
        "Crocodile",
        "Cupcake",
        "Dinosaur",
        "Doctor",
        "Donut",
        "Dragon",
        "Drums",
        "Duck",
        "Elephant",
        "Fish",
        "Flower",
        "Football",
        "Ghost",
        "Giraffe",
        "Guitar",
        "Hamburger",
        "Honeybee",
        "Horse",
        "Icecream",
        "Igloo",
        "Kangaroo",
        "Kitten",
        "Lion",
        "Microphone",
        "Monkey",
        "Mouse",
        "Ninja",
        "Nurse",
        "Octopus",
        "Owl",
        "Penguin",
        "Pizza",
        "Policeman",
        "Pretzel",
        "Pumpkin",
        "Robot",
        "Rocket",
        "Sailboat",
        "Sandcastle",
        "Saxophone",
        "Scooter",
        "Shark",
        "Ship",
        "Skateboard",
        "Snake",
        "Snowflake",
        "Snowman",
        "Spider",
        "Squirrel",
        "Sunflower",
        "Surfboard",
        "Swan",
        "Telescope",
        "Tiger",
        "Train",
        "Turtle",
        "Umbrella",
        "Vase",
        "Violin",
        "Volcano",
        "Waterfall",
        "Windmill",
        "Witch",
        "Wizard",
        "Xylophone",
        "Yacht",
        "Yellowstone",
        "Yo-yo",
        "Zebra",
        "Zoo",
        "Abacus",
        "Accordion",
        "Astronaut",
        "Bakery",
        "Balloon",
        "Banana",
        "Basketball",
        "Beachball",
        "Bicycle",
        "Binoculars",
        "Bookshelf",
        "Bubblegum",
        "Butterfly",
        "Cactus",
        "Calculator",
        "Calendar",
        "Candy",
        "Cannon",
        "Cardboard",
        "Carnival",
        "Castle",
        "Caterpillar",
        "Chainsaw",
        "Chair",
        "Cherry",
        "Chessboard",
        "Chicken",
        "Clarinet",
        "Clock",
        "Cloud",
        "Cockroach",
        "Computer",
        "Crayon",
        "Crocodile",
        "Crown",
        "Cupcake",
        "Daffodil",
        "Dalmatian",
        "Dartboard",
        "Dictionary",
        "Dinosaur",
        "Doctor",
        "Dog",
        "Donkey",
        "Duck",
        "Eagle",
        "Earphone",
        "Earthworm",
        "Elephant",
        "Elvis",
        "Eyeglasses",
        "Fairy",
        "Fish",
        "Flower",
        "Football",
        "Fountain",
        "Fox",
        "Frog",
        "Gargoyle",
        "Giraffe",
        "Gloves",
        "Golf",
        "Grapes",
        "Guitar",
        "Hamburger",
        "Hamster",
        "Honeybee",
        "Horse",
        "Icecream",
        "Igloo",
        "Kangaroo",
        "Kitten",
        "Lion",
        "Llama",
        "Mailbox",
        "Mango",
        "Map",
        "Mars",
        "Meteorite",
        "Microscope",
        "Monkey",
        "Mouse",
        "Napkin",
        "Ninja",
        "Nurse",
        "Octopus",
        "Owl",
        "Pajamas",
        "Palm tree",
        "Paprika",
        "Parrot",
        "Penguin",
        "Piano",
        "Police car",
        "Popcorn",
        "Pretzel",
        "Pumpkin",
        "Puppy",
        "Quail",
        "Rabbit",
        "Rainbow",
        "Rat",
        "Raven",
        "Robot",
        "Rocket",
        "Sailboat",
        "Sandcastle",
        "Saxophone",
        "Scooter",
        "Shark",
        "Ship",
        "Skateboard",
        "Snake",
        "Snowflake",
        "Snowman",
        "Spider",
        "Squirrel",
        "Sunflower",
        "Surfboard",
        "Swan",
        "Telescope",
        "Tiger",
        "Train",
        "Turtle",
        "Umbrella",
        "Vase",
        "Violin",
        "Volcano",
        "Waterfall",
        "Windmill",
        "Witch",
        "Wizard",
        "Xylophone",
        "Yacht",
        "Yellowstone",
        "Yo-yo",
        "Zebra",
        "Zoo"
    ]
}
