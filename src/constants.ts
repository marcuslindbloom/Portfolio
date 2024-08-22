export const scaleFactor = 4;

export const dialogueData = {
  pc: `This is my Ubuntu machine, running with Regolith as the window manager. I primarily work with Java 17 and 21, and I'm proficient in using Spring Boot, TestContainers, and Apache Kafka. I’m also familiar with tools like Kubernetes, Terraform, Docker, and React. My setup is optimized for efficient development, whether I’m working on backend services or diving into infrastructure as code. It's a versatile environment that keeps me productive and ready to tackle any challenge.`,
  "degree": `This is my Bachelor in Business degree. It’s a reminder of that we are constantly trying to solve a business problems`,
  "sofa-table": `This is my sofa table, where I spend time reading books from the library and getting jumped on by the kids. It’s a busy spot in the house, full of activity and learning.`,
  tv: `The TV is mostly tuned to Peppa Pig for the kids, but when I get a chance, I like to watch some YouTube channels like <a href='https://www.youtube.com/@Computerphile' target='_blank'>Computerphile</a> and <a href='https://www.youtube.com/@coffeesoftware' target='_blank'>Coffee Software</a>, as well as talks by Josh Long.`,
  bed: `This is where I sleep. Some of my best ideas for optimizing microservices or designing scalable architectures come to me here. I always keep a notepad nearby to jot down those midnight revelations.`,
  resume: `This is my desk, and on it is my resume. You can view it on my <a href='https://www.linkedin.com/in/marcuslindbloom' target='_blank'>LinkedIn profile</a>. I'm always open to new opportunities, so feel free to connect with me if you have something interesting.`,
  projects: `You can find some of my projects on my <a href='https://gitlab.com/marcuslindbloom' target='_blank'>GitLab</a>. It’s updated regularly, although you might see fewer projects now and then if I’m in the process of renewing them.`,
  library: `Here, I have books like High-Performance Java Persistence, Design Patterns, and Deep Work by Cal Newport. It's a mix of technical deep dives and strategies for maintaining focus in a busy world.`,
  exit: `If you want to exit this portfolio, just close the tab. Thanks for stopping by, and feel free to connect with me if you’d like to chat about backend development, cloud computing, or anything tech-related.`,
  hole: `This hole in the kitchen floor is suspiciously large. I wonder if the kids are planning a secret underground lair? Or maybe they’re just testing out some new digging tools? Either way, it’s definitely not OSHA-approved!`, 
  flowers: `These flowers are the most low-maintenance plants ever. No need for watering or sunlight—just pure digital beauty. If only real plants were this easy to care for!`, 
  wines: `Fun fact: I have a WSET 3 Advanced certificate, so I know a thing or two about wine. Perfect for impressing the team at the next staff party. Just don't ask me to pair wine with chicken bones, though!`, 
  bones: `These bones are from yesterday’s dinner... at least, that’s what I keep telling myself. They’re supposed to be chicken, but they do look oddly human. Should I be concerned?`, 
  fire: `There was no stove in the spritesheet, so I improvised with a cozy log fire instead. Who needs a modern kitchen when you can cook over an open flame? It's all about that rustic charm.`, 
  toilet: `Apologies, but this house tour doesn’t include the bathrooms. Some things are best left to the imagination!`,
  throne: `This spot is where I brainstorm and strategize, whether it's coding solutions or the next big project. It's not quite a throne, but it’s where decisions are made!`,
  fridge: `My fridge is packed with delicious goodies, a testament to my 15 years in the hospitality industry. Cooking is my therapy—just don’t ask me to share my secret recipes!`,
  lamp: `It’s just a lamp, but it really ties the room together, don’t you think? Every game needs a good lighting source, even if it’s purely decorative.`, 
  "baby-bed": `This is the baby’s bed, and let’s be honest—she’ll probably be the baby forever. It’s hard to let them grow up, even in a game.`,
  "kids-beds": `The kids aren’t in their beds... I wonder what they’re up to? Probably something that involves that suspicious hole in the kitchen. Ah, the joys of parenting!`
};

// Scene names 
export const SCENES = {
    MAIN: "main",
}

// Sprite-related constants
export const SPRITES = {
    SHEET: "spritesheet",
    MAP: "map",
};

// Animation names
export const ANIMATIONS = {
    IDLE_DOWN: "idle-down",
    WALK_DOWN: "walk-down",
    IDLE_SIDE: "idle-side",
    WALK_SIDE: "walk-side",
    IDLE_UP: "idle-up",
    WALK_UP: "walk-up",
    FIRE: "fire",
};

// Color constants
export const COLORS = {
    BACKGROUND_HEX: "#311047",
};

// Layer names
export const LAYERS = {
    BOUNDARIES: "boundaries",
    SPAWNPOINTS: "spawnpoints",
};

// Entity names
export const ENTITIES = {
    PLAYER: "player",
};

// Input-related constants
export const INPUT = {
  MOUSE_BUTTON_LEFT: "left",
  ENTER_KEY: "Enter",
  KEY_RIGHT: "right",
  KEY_LEFT: "left",
  KEY_UP: "up",
  KEY_DOWN: "down",
};

// Directional constants
export const DIRECTIONS = {
    DOWN: "down",
    UP: "up",
    SIDE: "side",
    RIGHT: "right",
    LEFT: "left",
};

// Player properties
export const PLAYER = {
    SPEED: 250,
};

// Angle bounds
export const ANGLES = {
    LOWER_BOUND: 50,
    UPPER_BOUND: 125,
};

// DOM element IDs
export const ELEMENT_IDS = {
    TEXTBOX_CONTAINER: "textbox-container",
    DIALOGUE: "dialogue",
    CLOSE_BUTTON: "close",
};

// CSS styles
export const STYLES = {
    DISPLAY_BLOCK: "block",
    DISPLAY_NONE: "none",
};

// Event names
export const EVENTS = {
    CLICK: "click",
    KEYPRESS: "keypress",
};

// Default values
export const DEFAULTS = {
    EMPTY_STRING: "",
};

// Timing constants
export const TIMING = {
    INTERVAL_DELAY: 1,
};

// Camera scaling factors
export const CAMERA_SCALE_FACTORS = {
    MIN: 1,
    MAX: 1.5,
};
