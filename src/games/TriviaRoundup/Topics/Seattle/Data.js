import {
  shuffleArray,
  getQuestionsForDate as getGameQuestionsForDate,
} from "../../../utils/game";
import { getDataForDate, getPTDate } from "../../../utils/date";

export const SEATTLE_QUESTIONS = [
  {
    date: "2024-11-30",
    questions: [
      {
        id: "sea-1120-1",
        question: "What body of water is Seattle primarily situated on?",
        options: [
          "Puget Sound",
          "Pacific Ocean",
          "Lake Washington",
          "Columbia River",
        ],
        correctAnswer: "Puget Sound",
        category: "Geography",
        difficulty: 1,
      },
      {
        id: "sea-1120-2",
        question: "Which famous market is a Seattle landmark?",
        options: [
          "Pike Place Market",
          "Queen Victoria Market",
          "Reading Terminal Market",
          "Ferry Building Marketplace",
        ],
        correctAnswer: "Pike Place Market",
        category: "Landmarks",
        difficulty: 2,
      },
      {
        id: "sea-1120-3",
        question:
          "What is the elevation of the Space Needle's observation deck?",
        options: ["520 feet", "605 feet", "502 feet", "550 feet"],
        correctAnswer: "520 feet",
        category: "Landmarks",
        difficulty: 3,
      },
      {
        id: "sea-1120-4",
        question:
          "Which Seattle neighborhood is known as 'The Center of the Universe'?",
        options: ["Fremont", "Ballard", "Capitol Hill", "Queen Anne"],
        correctAnswer: "Fremont",
        category: "Culture",
        difficulty: 4,
      },
      {
        id: "sea-1120-5",
        question:
          "What year did Microsoft move its headquarters to the Seattle area?",
        options: ["1979", "1986", "1981", "1975"],
        correctAnswer: "1979",
        category: "Business",
        difficulty: 5,
      },
      {
        id: "sea-1120-6",
        question: "Which Seattle architecture firm designed the Space Needle?",
        options: [
          "John Graham & Company",
          "NBBJ",
          "LMN Architects",
          "Weber Thompson",
        ],
        correctAnswer: "John Graham & Company",
        category: "Architecture",
        difficulty: 6,
      },
      {
        id: "sea-1120-7",
        question:
          "What indigenous name for the area means 'land between two waters'?",
        options: ["Duwamish", "Suquamish", "Coast Salish", "Muckleshoot"],
        correctAnswer: "Duwamish",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1120-8",
        question:
          "Which Seattle mayor implemented the city's first comprehensive zoning plan?",
        options: [
          "Hugh Caldwell",
          "Bertha Knight Landes",
          "Ole Hanson",
          "Edwin Brown",
        ],
        correctAnswer: "Hugh Caldwell",
        category: "History",
        difficulty: 8,
      },
      {
        id: "sea-1120-9",
        question:
          "What percentage of Seattle's power comes from hydroelectric sources?",
        options: ["90%", "75%", "85%", "80%"],
        correctAnswer: "90%",
        category: "Infrastructure",
        difficulty: 9,
      },
      {
        id: "sea-1120-10",
        question: "Which rare geological feature formed Seattle's Seven Hills?",
        options: [
          "Glacial drumlins",
          "Volcanic domes",
          "Tectonic uplift",
          "Coastal erosion",
        ],
        correctAnswer: "Glacial drumlins",
        category: "Geology",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-21",
    questions: [
      {
        id: "sea-1121-1",
        question: "What is the name of Seattle's NFL team?",
        options: ["Seahawks", "Mariners", "Sounders", "SuperSonics"],
        correctAnswer: "Seahawks",
        category: "Sports",
        difficulty: 1,
      },
      {
        id: "sea-1121-2",
        question:
          "Which Seattle neighborhood is home to the famous 'Fremont Troll'?",
        options: ["Fremont", "Ballard", "Capitol Hill", "Queen Anne"],
        correctAnswer: "Fremont",
        category: "Landmarks",
        difficulty: 2,
      },
      {
        id: "sea-1121-3",
        question: "What is the name of Seattle's oldest public park?",
        options: [
          "Denny Park",
          "Volunteer Park",
          "Discovery Park",
          "Green Lake Park",
        ],
        correctAnswer: "Denny Park",
        category: "Parks",
        difficulty: 3,
      },
      {
        id: "sea-1121-4",
        question: "Which Seattle radio station is known as 'The End'?",
        options: ["KNDD", "KEXP", "KISW", "KIRO"],
        correctAnswer: "KNDD",
        category: "Media",
        difficulty: 4,
      },
      {
        id: "sea-1121-5",
        question: "What year was the University of Washington founded?",
        options: ["1861", "1851", "1871", "1881"],
        correctAnswer: "1861",
        category: "Education",
        difficulty: 5,
      },
      {
        id: "sea-1121-6",
        question:
          "Which Seattle chef won the James Beard Award for Best Chef Northwest in 2012?",
        options: ["Matt Dillon", "Tom Douglas", "Ethan Stowell", "John Howie"],
        correctAnswer: "Matt Dillon",
        category: "Food",
        difficulty: 6,
      },
      {
        id: "sea-1121-7",
        question: "What was the original name of Pioneer Square?",
        options: [
          "Denny's Landing",
          "Henry's Square",
          "Maynard's Corner",
          "Doc's Point",
        ],
        correctAnswer: "Denny's Landing",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1121-8",
        question:
          "Which Seattle tunnel was built to replace the Alaskan Way Viaduct?",
        options: [
          "SR 99 Tunnel",
          "Battery Street Tunnel",
          "Mount Baker Tunnel",
          "Downtown Transit Tunnel",
        ],
        correctAnswer: "SR 99 Tunnel",
        category: "Infrastructure",
        difficulty: 8,
      },
      {
        id: "sea-1121-9",
        question:
          "What rare tree species grows in Seattle's Washington Park Arboretum?",
        options: [
          "Wollemia nobilis",
          "Ginkgo biloba",
          "Metasequoia",
          "Dawn Redwood",
        ],
        correctAnswer: "Wollemia nobilis",
        category: "Nature",
        difficulty: 9,
      },
      {
        id: "sea-1121-10",
        question:
          "Which Seattle building pioneered the use of glass curtain walls in high-rise construction?",
        options: [
          "Norton Building",
          "Smith Tower",
          "Columbia Center",
          "Space Needle",
        ],
        correctAnswer: "Norton Building",
        category: "Architecture",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-22",
    questions: [
      {
        id: "sea-1122-1",
        question: "What is the name of Seattle's MLB team?",
        options: ["Mariners", "Seahawks", "Sounders", "Storm"],
        correctAnswer: "Mariners",
        category: "Sports",
        difficulty: 1,
      },
      {
        id: "sea-1122-2",
        question: "Which lake borders Seattle's eastern edge?",
        options: [
          "Lake Washington",
          "Lake Union",
          "Green Lake",
          "Lake Sammamish",
        ],
        correctAnswer: "Lake Washington",
        category: "Geography",
        difficulty: 2,
      },
      {
        id: "sea-1122-3",
        question:
          "What is the name of Seattle's professional women's basketball team?",
        options: ["Storm", "Reign", "Force", "Thunder"],
        correctAnswer: "Storm",
        category: "Sports",
        difficulty: 3,
      },
      {
        id: "sea-1122-4",
        question:
          "Which Seattle neighborhood hosts the annual Seafair Pirates Landing?",
        options: [
          "Alki Beach",
          "Golden Gardens",
          "Madison Park",
          "Seward Park",
        ],
        correctAnswer: "Alki Beach",
        category: "Events",
        difficulty: 4,
      },
      {
        id: "sea-1122-5",
        question: "What year was the Seattle Art Museum founded?",
        options: ["1933", "1925", "1941", "1929"],
        correctAnswer: "1933",
        category: "Arts",
        difficulty: 5,
      },
      {
        id: "sea-1122-6",
        question:
          "Which Seattle bridge is the longest floating bridge in the world?",
        options: [
          "520 Bridge",
          "I-90 Bridge",
          "West Seattle Bridge",
          "Aurora Bridge",
        ],
        correctAnswer: "520 Bridge",
        category: "Infrastructure",
        difficulty: 6,
      },
      {
        id: "sea-1122-7",
        question: "What was the original name of the Space Needle?",
        options: ["Space Cage", "Space Tower", "Space Spire", "Space Spiral"],
        correctAnswer: "Space Cage",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1122-8",
        question:
          "Which Seattle neighborhood was originally a separate city until 1907?",
        options: ["Ballard", "West Seattle", "Columbia City", "Georgetown"],
        correctAnswer: "Ballard",
        category: "History",
        difficulty: 8,
      },
      {
        id: "sea-1122-9",
        question:
          "What indigenous art style is featured in the Seattle Art Museum's Olympic Sculpture Park?",
        options: ["Coast Salish", "Haida", "Tlingit", "Kwakwaka'wakw"],
        correctAnswer: "Coast Salish",
        category: "Art",
        difficulty: 9,
      },
      {
        id: "sea-1122-10",
        question:
          "Which Seattle architect designed the original Rainier Tower's unique pedestal base?",
        options: [
          "Minoru Yamasaki",
          "Paul Thiry",
          "Fred Bassetti",
          "Victor Steinbrueck",
        ],
        correctAnswer: "Minoru Yamasaki",
        category: "Architecture",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-23",
    questions: [
      {
        id: "sea-1123-1",
        question: "What is the name of Seattle's largest public park?",
        options: [
          "Discovery Park",
          "Volunteer Park",
          "Green Lake Park",
          "Seward Park",
        ],
        correctAnswer: "Discovery Park",
        category: "Parks",
        difficulty: 1,
      },
      {
        id: "sea-1123-2",
        question: "Which Seattle neighborhood is known for its houseboats?",
        options: ["Lake Union", "Ballard", "Wallingford", "Eastlake"],
        correctAnswer: "Lake Union",
        category: "Neighborhoods",
        difficulty: 2,
      },
      {
        id: "sea-1123-3",
        question: "What is the name of Seattle's professional soccer team?",
        options: ["Sounders FC", "United", "FC Seattle", "City FC"],
        correctAnswer: "Sounders FC",
        category: "Sports",
        difficulty: 3,
      },
      {
        id: "sea-1123-4",
        question:
          "Which Seattle museum features exhibits about music and pop culture?",
        options: ["MoPOP", "SAM", "MOHAI", "Wing Luke"],
        correctAnswer: "MoPOP",
        category: "Museums",
        difficulty: 4,
      },
      {
        id: "sea-1123-5",
        question: "What year did the Great Seattle Fire occur?",
        options: ["1889", "1885", "1892", "1887"],
        correctAnswer: "1889",
        category: "History",
        difficulty: 5,
      },
      {
        id: "sea-1123-6",
        question: "Which Seattle brewery was founded in 1981?",
        options: ["Redhook", "Pike Brewing", "Elysian", "Georgetown"],
        correctAnswer: "Redhook",
        category: "Business",
        difficulty: 6,
      },
      {
        id: "sea-1123-7",
        question: "What was the original purpose of the Smith Tower?",
        options: [
          "Fireproof office building",
          "Hotel",
          "Department store",
          "Bank headquarters",
        ],
        correctAnswer: "Fireproof office building",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1123-8",
        question: "Which Seattle park features a restored prairie ecosystem?",
        options: [
          "Magnuson Park",
          "Discovery Park",
          "Lincoln Park",
          "Carkeek Park",
        ],
        correctAnswer: "Magnuson Park",
        category: "Nature",
        difficulty: 8,
      },
      {
        id: "sea-1123-9",
        question: "What type of earthquake fault runs directly under Seattle?",
        options: [
          "Thrust fault",
          "Strike-slip fault",
          "Normal fault",
          "Reverse fault",
        ],
        correctAnswer: "Thrust fault",
        category: "Geology",
        difficulty: 9,
      },
      {
        id: "sea-1123-10",
        question:
          "Which Seattle building was the first to use seismic base isolation in the US?",
        options: [
          "US Court of Appeals",
          "Columbia Center",
          "Seattle Municipal Tower",
          "Fourth and Madison Building",
        ],
        correctAnswer: "US Court of Appeals",
        category: "Architecture",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-24",
    questions: [
      {
        id: "sea-1124-1",
        question: "What is Seattle's official nickname?",
        options: ["Emerald City", "Rain City", "Queen City", "Jet City"],
        correctAnswer: "Emerald City",
        category: "General",
        difficulty: 1,
      },
      {
        id: "sea-1124-2",
        question: "Which Seattle street features the famous 'gum wall'?",
        options: ["Post Alley", "Pine Street", "Pike Street", "First Avenue"],
        correctAnswer: "Post Alley",
        category: "Landmarks",
        difficulty: 2,
      },
      {
        id: "sea-1124-3",
        question: "What is the name of Seattle's first skyscraper?",
        options: [
          "Smith Tower",
          "Space Needle",
          "Columbia Center",
          "1201 Third Avenue",
        ],
        correctAnswer: "Smith Tower",
        category: "Architecture",
        difficulty: 3,
      },
      {
        id: "sea-1124-4",
        question:
          "Which Seattle neighborhood is known for its gay pride parade?",
        options: ["Capitol Hill", "Fremont", "Ballard", "Queen Anne"],
        correctAnswer: "Capitol Hill",
        category: "Culture",
        difficulty: 4,
      },
      {
        id: "sea-1124-5",
        question: "What year was the first Starbucks opened?",
        options: ["1971", "1969", "1973", "1975"],
        correctAnswer: "1971",
        category: "Business",
        difficulty: 5,
      },
      {
        id: "sea-1124-6",
        question: "Which Seattle mayor served during the WTO protests of 1999?",
        options: ["Paul Schell", "Norm Rice", "Greg Nickels", "Charles Royer"],
        correctAnswer: "Paul Schell",
        category: "Politics",
        difficulty: 6,
      },
      // Continuing from previous...
      {
        id: "sea-1124-7",
        question:
          "What was the original name of South Lake Union's 'Denny Triangle'?",
        options: [
          "North Downtown",
          "Denny Hill",
          "South Lake District",
          "Cascade",
        ],
        correctAnswer: "Denny Hill",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1124-8",
        question: "Which Seattle tunnel boring machine was nicknamed 'Bertha'?",
        options: [
          "SR 99 TBM",
          "Sound Transit TBM",
          "Light Rail TBM",
          "Battery Street TBM",
        ],
        correctAnswer: "SR 99 TBM",
        category: "Infrastructure",
        difficulty: 8,
      },
      {
        id: "sea-1124-9",
        question: "What unique geological feature lies beneath Pioneer Square?",
        options: [
          "Underground city",
          "Ancient lava tubes",
          "Native burial ground",
          "Glacial deposit",
        ],
        correctAnswer: "Underground city",
        category: "History",
        difficulty: 9,
      },
      {
        id: "sea-1124-10",
        question:
          "Which Seattle building's design was inspired by a Native American basket?",
        options: [
          "Museum of History & Industry",
          "Seattle Central Library",
          "EMP Museum",
          "City Hall",
        ],
        correctAnswer: "Museum of History & Industry",
        category: "Architecture",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-25",
    questions: [
      {
        id: "sea-1125-1",
        question:
          "A fish just flew over your head at Pike Place Market! This legendary tradition started because...",
        options: [
          "The fishmongers got tired of walking back and forth",
          "Tourists kept asking for a show",
          "Someone dropped a salmon by accident",
          "A local TV show requested it",
        ],
        correctAnswer: "The fishmongers got tired of walking back and forth",
        category: "Local Life",
        difficulty: 1,
        explanation:
          "Yep - in the 1930s, they figured why walk fish from the counter to the ice when you could just yeet them across! Now it's world-famous, but it started as pure laziness-driven innovation.",
      },
      {
        id: "sea-1125-2",
        question:
          "Your friend spots houseboats on Lake Union and asks 'Why would anyone live on water in rainy Seattle?' Well...",
        options: [
          "Back in the day, it was the ultimate life hack for cheap rent",
          "Rich people wanted vacation homes",
          "The city ran out of land to build on",
          "Fishermen needed to live near their boats",
        ],
        correctAnswer:
          "Back in the day, it was the ultimate life hack for cheap rent",
        category: "City Life",
        difficulty: 2,
        explanation:
          "Boom! These floating homes started as a budget living solution during the Great Depression. Now they're worth millions - talk about a property value glow-up!",
      },
      {
        id: "sea-1125-3",
        question:
          "You're under the Aurora Bridge and there's a massive stone troll crushing a VW Beetle. This happened because...",
        options: [
          "Artists turned an ugly spot into the city's weirdest selfie backdrop",
          "The city needed to scare away graffiti artists",
          "A car dealership wanted attention",
          "Kids voted for it in a design contest",
        ],
        correctAnswer:
          "Artists turned an ugly spot into the city's weirdest selfie backdrop",
        category: "Local Culture",
        difficulty: 3,
        explanation:
          "This 18-foot troll was the winning answer to 'how do we make this sketchy underbridge area cool?' Now it's Instagram famous and people leave offerings of hubcaps!",
      },
      {
        id: "sea-1125-4",
        question:
          "After the Great Seattle Fire of 1889, instead of just rebuilding, the city decided to...",
        options: [
          "Level up and build a whole new layer of city on top of the old one",
          "Move everything away from the water",
          "Switch to all-brick buildings",
          "Create the world's biggest fire department",
        ],
        correctAnswer:
          "Level up and build a whole new layer of city on top of the old one",
        category: "City Stories",
        difficulty: 4,
        explanation:
          "They literally said 'let's just stack a new city on top!' Now the underground tunnels are where all the ghost stories (and tours) happen.",
      },
      {
        id: "sea-1125-5",
        question:
          "When Bill Gates brought Microsoft to Seattle in 1979, he was really after...",
        options: [
          "All those smart University of Washington computer nerds",
          "Seattle's famous coffee to fuel late-night coding",
          "Cheap office space in the rain",
          "Being closer to his mom's cooking",
        ],
        correctAnswer:
          "All those smart University of Washington computer nerds",
        category: "Tech Tales",
        difficulty: 5,
        explanation:
          "Gates wanted those UW computer science grads! And hey, being close to mom's house probably didn't hurt either.",
      },
      {
        id: "sea-1125-6",
        question: "The Space Needle's original design came from...",
        options: [
          "A doodle on a napkin at a coffee shop",
          "A professional architect's blueprint",
          "A child's drawing contest",
          "Copying the Eiffel Tower",
        ],
        correctAnswer: "A doodle on a napkin at a coffee shop",
        category: "City Icons",
        difficulty: 6,
        explanation:
          "The most famous Seattle building started as a coffee shop scribble! They built this 605-foot doodle in just 400 days for the World's Fair.",
      },
      {
        id: "sea-1125-7",
        question:
          "The Fremont neighborhood declared itself 'The Center of the Universe' because...",
        options: [
          "They thought it would be hilarious (it was)",
          "They found an ancient cosmic alignment",
          "Their GPS coordinates are special",
          "A mayor made it official",
        ],
        correctAnswer: "They thought it would be hilarious (it was)",
        category: "Neighborhood Vibes",
        difficulty: 7,
        explanation:
          "In true Seattle style, they just decided to be weird and it stuck. They even installed signs pointing to 'The Center of the Universe' and 'Anywhere but here'!",
      },
      {
        id: "sea-1125-8",
        question: "Seattle gets 90% of its power from...",
        options: [
          "All that rain they keep complaining about",
          "Underground steam vents",
          "Thousands of hamster wheels",
          "Coffee-powered generators",
        ],
        correctAnswer: "All that rain they keep complaining about",
        category: "City Secrets",
        difficulty: 8,
        explanation:
          "They turned their biggest complaint into their biggest power source! All that rain feeds hydroelectric dams that power the city. Talk about making lemonade from lemons...",
      },
      {
        id: "sea-1125-9",
        question:
          "Why do random salmon sometimes show up in the middle of the city?",
        options: [
          "They're swimming home through secret underground streams",
          "The fish market had a delivery accident",
          "They're escape artists from the aquarium",
          "Local pranksters plant them",
        ],
        correctAnswer:
          "They're swimming home through secret underground streams",
        category: "Urban Nature",
        difficulty: 9,
        explanation:
          "Seattle built right over salmon streams, but these determined fish still find their way through underground waterways. Sometimes they pop up in weird places like parking lots!",
      },
      {
        id: "sea-1125-10",
        question: "What's the real reason Seattle has so many coffee shops?",
        options: [
          "The rain makes everyone need a cozy indoor hangout",
          "Starbucks started a coffee arms race",
          "A law requires one per block",
          "Coffee beans grow well here",
        ],
        correctAnswer: "The rain makes everyone need a cozy indoor hangout",
        category: "Daily Life",
        difficulty: 10,
        explanation:
          "When it rains 152 days a year, you need somewhere warm to hang out! Coffee shops became Seattle's second living room, and then it got competitive...",
      },
    ],
  },
  {
    date: "2024-11-26",
    questions: [
      {
        id: "sea-1126-1",
        question: "What color are Seattle's public library cards?",
        options: ["Green", "Blue", "Red", "Yellow"],
        correctAnswer: "Green",
        category: "Culture",
        difficulty: 1,
      },
      {
        id: "sea-1126-2",
        question: "Which street is Seattle's main downtown shopping district?",
        options: [
          "Pine Street",
          "First Avenue",
          "Third Avenue",
          "Fifth Avenue",
        ],
        correctAnswer: "Pine Street",
        category: "Business",
        difficulty: 2,
      },
      {
        id: "sea-1126-3",
        question: "What animal is featured on the Fremont Bridge?",
        options: ["Troll", "Dragon", "Bear", "Eagle"],
        correctAnswer: "Troll",
        category: "Landmarks",
        difficulty: 3,
      },
      {
        id: "sea-1126-4",
        question: "Which Seattle neighborhood hosts the Bite of Seattle?",
        options: [
          "Seattle Center",
          "Downtown",
          "South Lake Union",
          "Pioneer Square",
        ],
        correctAnswer: "Seattle Center",
        category: "Events",
        difficulty: 4,
      },
      {
        id: "sea-1126-5",
        question: "What year did the Seattle Monorail open?",
        options: ["1962", "1960", "1964", "1965"],
        correctAnswer: "1962",
        category: "Transportation",
        difficulty: 5,
      },
      {
        id: "sea-1126-6",
        question: "Which Seattle high school is the oldest?",
        options: [
          "Broadway High",
          "Roosevelt High",
          "Garfield High",
          "Franklin High",
        ],
        correctAnswer: "Broadway High",
        category: "Education",
        difficulty: 6,
      },
      {
        id: "sea-1126-7",
        question: "What was the original purpose of Gas Works Park?",
        options: [
          "Gas manufacturing plant",
          "Power station",
          "Oil refinery",
          "Coal gasification",
        ],
        correctAnswer: "Gas manufacturing plant",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1126-8",
        question:
          "Which Seattle mayor implemented the first comprehensive bike plan?",
        options: ["Wes Uhlman", "Charles Royer", "Norman Rice", "Paul Schell"],
        correctAnswer: "Wes Uhlman",
        category: "Politics",
        difficulty: 8,
      },
      {
        id: "sea-1126-9",
        question: "What indigenous trading route became Westlake Avenue?",
        options: [
          "Duwamish Trail",
          "Lake Trail",
          "Coast Trail",
          "Forest Trail",
        ],
        correctAnswer: "Duwamish Trail",
        category: "History",
        difficulty: 9,
      },
      {
        id: "sea-1126-10",
        question:
          "Which Seattle building was the first to use steel-frame construction?",
        options: [
          "Alaska Building",
          "Smith Tower",
          "Pioneer Building",
          "Dexter Horton Building",
        ],
        correctAnswer: "Alaska Building",
        category: "Architecture",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-27",
    questions: [
      {
        id: "sea-1127-1",
        question: "What is the name of Seattle's professional hockey team?",
        options: ["Kraken", "Thunderbirds", "Totems", "Metropolitans"],
        correctAnswer: "Kraken",
        category: "Sports",
        difficulty: 1,
      },
      {
        id: "sea-1127-2",
        question: "Which Seattle beach has a lighthouse?",
        options: [
          "Alki Beach",
          "Golden Gardens",
          "Madison Park",
          "Seward Park",
        ],
        correctAnswer: "Alki Beach",
        category: "Landmarks",
        difficulty: 2,
      },
      {
        id: "sea-1127-3",
        question: "What is the name of Seattle's largest theater?",
        options: [
          "Paramount Theatre",
          "5th Avenue Theatre",
          "Moore Theatre",
          "Neptune Theatre",
        ],
        correctAnswer: "Paramount Theatre",
        category: "Entertainment",
        difficulty: 3,
      },
      {
        id: "sea-1127-4",
        question:
          "Which Seattle neighborhood is known for its fishing industry?",
        options: ["Ballard", "Fremont", "Wallingford", "Georgetown"],
        correctAnswer: "Ballard",
        category: "Industry",
        difficulty: 4,
      },
      {
        id: "sea-1127-5",
        question: "What year did the Seattle Underground Tour begin?",
        options: ["1965", "1962", "1968", "1970"],
        correctAnswer: "1965",
        category: "Tourism",
        difficulty: 5,
      },
      {
        id: "sea-1127-6",
        question: "Which Seattle park contains a former military fort?",
        options: [
          "Discovery Park",
          "Magnuson Park",
          "Lincoln Park",
          "Seward Park",
        ],
        correctAnswer: "Discovery Park",
        category: "History",
        difficulty: 6,
      },
      {
        id: "sea-1127-7",
        question: "What was the original name of Lake Union?",
        options: ["Small Lake", "Lake Tenas", "Lake Seattle", "Inner Lake"],
        correctAnswer: "Lake Tenas",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1127-8",
        question:
          "Which Seattle building was the city's first concrete structure?",
        options: [
          "Seattle National Bank",
          "Home Insurance Building",
          "Hoge Building",
          "Arctic Building",
        ],
        correctAnswer: "Seattle National Bank",
        category: "Architecture",
        difficulty: 8,
      },
      {
        id: "sea-1127-9",
        question:
          "What percentage of Seattle's original wetlands remain today?",
        options: ["Less than 2%", "About 5%", "Around 10%", "More than 15%"],
        correctAnswer: "Less than 2%",
        category: "Environment",
        difficulty: 9,
      },
      {
        id: "sea-1127-10",
        question:
          "Which Seattle architect designed the original King Street Station clock tower?",
        options: [
          "Reed & Stem",
          "Daniel Burnham",
          "Elmer Fisher",
          "John Parkinson",
        ],
        correctAnswer: "Reed & Stem",
        category: "Architecture",
        difficulty: 10,
      },
    ],
  },
  {
    date: "2024-11-28",
    questions: [
      {
        id: "sea-1128-1",
        question: "What is Seattle's approximate population?",
        options: ["737,015", "650,000", "800,000", "700,000"],
        correctAnswer: "737,015",
        category: "Demographics",
        difficulty: 1,
      },
      {
        id: "sea-1128-2",
        question: "Which Seattle park has a Japanese garden?",
        options: [
          "Washington Park Arboretum",
          "Volunteer Park",
          "Discovery Park",
          "Seward Park",
        ],
        correctAnswer: "Washington Park Arboretum",
        category: "Parks",
        difficulty: 2,
      },
      {
        id: "sea-1128-3",
        question: "What is the name of Seattle's oldest farmers market?",
        options: [
          "Pike Place Market",
          "University District Market",
          "Ballard Market",
          "West Seattle Market",
        ],
        correctAnswer: "Pike Place Market",
        category: "Shopping",
        difficulty: 3,
      },
      {
        id: "sea-1128-4",
        question: "Which Seattle neighborhood is known for its art galleries?",
        options: ["Pioneer Square", "Capitol Hill", "Ballard", "Fremont"],
        correctAnswer: "Pioneer Square",
        category: "Arts",
        difficulty: 4,
      },
      {
        id: "sea-1128-5",
        question: "What year was the Seattle Great Wheel built?",
        options: ["2012", "2010", "2014", "2008"],
        correctAnswer: "2012",
        category: "Landmarks",
        difficulty: 5,
      },
      {
        id: "sea-1128-6",
        question: "Which Seattle street was the city's first planked road?",
        options: [
          "Yesler Way",
          "First Avenue",
          "Pike Street",
          "Madison Street",
        ],
        correctAnswer: "Yesler Way",
        category: "History",
        difficulty: 6,
      },
      {
        id: "sea-1128-7",
        question: "What was Pike Place Market's original purpose?",
        options: [
          "Farmers direct-to-consumer",
          "Fish market",
          "Craft market",
          "General store",
        ],
        correctAnswer: "Farmers direct-to-consumer",
        category: "History",
        difficulty: 7,
      },
      {
        id: "sea-1128-8",
        question: "Which Seattle park was designed by the Olmsted Brothers?",
        options: [
          "Volunteer Park",
          "Discovery Park",
          "Gas Works Park",
          "Magnuson Park",
        ],
        correctAnswer: "Volunteer Park",
        category: "Parks",
        difficulty: 8,
      },
      {
        id: "sea-1128-9",
        question:
          "What indigenous trading practice influenced Pike Place Market's design?",
        options: [
          "Potlatch system",
          "Barter circles",
          "Trading posts",
          "Market squares",
        ],
        correctAnswer: "Potlatch system",
        category: "History",
        difficulty: 9,
      },
      {
        id: "sea-1128-10",
        question:
          "Which Seattle neighborhood was built on reclaimed tideflats?",
        options: [
          "Industrial District",
          "Pioneer Square",
          "Belltown",
          "South Lake Union",
        ],
        correctAnswer: "Industrial District",
        category: "History",
        difficulty: 10,
      },
    ],
  },
];

export default SEATTLE_QUESTIONS;

// Get questions for a specific date with shuffled options
export const getQuestionsForDate = (date) => {
  console.log(date);
  const dailyData = getDataForDate(date, SEATTLE_QUESTIONS);
  return (
    dailyData?.questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    })) || null
  );
};

// Get today's questions (in PT)
export const getLatestQuestions = () => {
  return getQuestionsForDate(getPTDate());
};
