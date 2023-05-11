import weighted from 'weighted';

// All generated rooms are square
const roomSize = 10;

const innerRoom = roomSize - 4;
const roomHeight = roomSize - 2;

const wallFeatures = [
    ')'
]

interface FeaturePool {
    pool: string[];
    weight: number;
}

const features: FeaturePool[] = [
    // enemy pool
    { pool: ['*', '}'], weight: 0.1 },
    // blank space pool
    { pool: [ ' ' ], weight: 0.8 },
    // item pool
    { pool: [ '(' ], weight: 0.1 }
]

const selectFeaturePool = () => {
    return weighted.select(features.map(f => f.pool), features.map(f => f.weight));
}

const getRandomFeature = () => {
    const featureList = selectFeaturePool();

    const selectedFeature = Math.floor(Math.random() * featureList.length);

    return featureList[selectedFeature];
}

const maxDoors = 4;
const minDoors = 2;

const doorFeatures = ["^", "v", "<", ">"];

const doorDirections = {
    top: '^',
    bottom: 'v',
    left: '<' ,
    right: '>'
};


const generateDoors = (numDoors: number, enter: string = 'left'): string[] => {
    const availableDoors = doorFeatures.filter((s) => s != doorDirections[enter]);
    const selectedDoors = [doorDirections[enter]];

    // remove two of the doors at random
    for(let i = selectedDoors.length; i <= numDoors; i++) {
        selectedDoors.push(...availableDoors.splice(Math.floor(Math.random()*availableDoors.length), 1));
    }

    return selectedDoors;
}

export const generateRoom = (enter: string): string[] => {
    const room = [];

    const doorCount = minDoors + Math.floor(Math.random() * (maxDoors - minDoors));
    const availableDoors = generateDoors(doorCount, enter);

    
    // generate top  wall
    let topWall = '';
    for (let x = 0; x < roomSize; x++) {
        if(x == 0) {
            topWall += 'y';
        } else if (x == roomSize - 1) {
            topWall += 'w';
        } else if (x == roomSize / 2 && availableDoors.includes('^')) {
            topWall += '^'
        } else {
            topWall += 'c';
        }
    }
    room.push(topWall);

    // generate interior
    for (let y = 0; y < roomHeight; y++) {
        let row = '';
        for (let x = 0; x < roomSize; x++) {
            if(x == 0) {
                if (y == roomHeight / 2 && availableDoors.includes('<')) {
                    row += '<';
                    continue;
                }

                row += 'a';
            } else if (x == roomSize - 1) {
                if (y == roomHeight / 2 && availableDoors.includes('>')) {
                    row += '>';
                    continue;
                }

                row += 'b';
            } else if (x > 1 && x < roomSize - 2 && y > 1 && y < roomHeight - 2) {
                row += getRandomFeature();
            } else {
                row += ' '
            }
        }
        room.push(row);
    }

    let bottomWall = '';
    for (let x = 0; x < roomSize; x++) {
        if(x == 0) {
            bottomWall += 'x';
        } else if (x == roomSize - 1) {
            bottomWall += 'z';
        } else if (x == roomSize / 2 && availableDoors.includes('v')) {
            bottomWall += 'v'
        }else {
            bottomWall += 'd';
        }
    }
    room.push(bottomWall);

    return room;
}