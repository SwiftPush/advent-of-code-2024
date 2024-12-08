import * as fs from "fs";
const input = fs.readFileSync("8-input.txt", "utf8");

// const input = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`;

// const input = `T.........
// ...T......
// .T........
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........`;

const grid = input.split("\n");

let antennaMap: Record<string, number[][]> = {};

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        const c = grid[i][j];
        if (c === ".") {
            continue;
        }

        if (!antennaMap[c]) {
            antennaMap[c] = [];
        }
        antennaMap[c].push([i, j]);
    }
}

const isInBounds = (val: number[]): boolean => {
    return val[1] >= 0 && val[1] < grid.length && val[0] >= 0 && val[0] < grid[val[1]].length;
};

let antinodes = new Set<string>();
for (const c in antennaMap) {
    const antennas = antennaMap[c];

    for (let a = 0; a < antennas.length; a++) {
        for (let b = a + 1; b < antennas.length; b++) {
            let a1 = [...antennas[a]];
            let a2 = [...antennas[b]];

            const [dX, dY] = [a2[0] - a1[0], a2[1] - a1[1]];

            while (isInBounds(a1) || isInBounds(a2)) {
                if (isInBounds(a1)) {
                    antinodes.add(`${a1[0]},${a1[1]}`);
                }
                if (isInBounds(a2)) {
                    antinodes.add(`${a2[0]},${a2[1]}`);
                }

                a1 = [a1[0] - dX, a1[1] - dY];
                a2 = [a2[0] + dX, a2[1] + dY];
            }
        }
    }
}

console.log(antinodes.size);
