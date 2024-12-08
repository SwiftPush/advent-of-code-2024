import * as fs from "fs";
const input = fs.readFileSync("6-input.txt", "utf8");
// const input: string = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;

// const input = `.....
// .....
// ....#
// #....
// .^.#.`

const grid = input.split("\n").map(line => line.split(""));

const part1 = () => {
    let [xPos, yPos] = [-1, -1];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                xPos = j;
                yPos = i;
            }
        }
    }

    let [xDir, yDir] = [0, -1];

    let seen: Set<string> = new Set<string>();
    seen.add([xPos, yPos].toString());

    while (xPos >= 0 && yPos >= 0 && yPos < grid.length && xPos < grid[yPos].length) {
        const nextC = grid[yPos + yDir]?.[xPos + xDir];

        if (nextC === "#") {
            if (xDir === 0 && yDir == -1) {
                xDir = 1;
                yDir = 0;
            } else if (xDir === 1 && yDir === 0) {
                xDir = 0;
                yDir = 1;
            } else if (xDir === 0 && yDir === 1) {
                xDir = -1;
                yDir = 0;
            } else if (xDir === -1 && yDir === 0) {
                xDir = 0;
                yDir = -1;
            }
        } else {
            xPos += xDir;
            yPos += yDir;

            seen.add([xPos, yPos].toString());
        }
    }

    return seen.size - 1;
};

const part2 = () => {
    function isLoop(grid: string[][], xPos: number, yPos: number, xDir: number, yDir: number): boolean {
        let seen: Record<string, boolean> = {};

        while (xPos >= 0 && yPos >= 0 && yPos < grid.length && xPos < grid[yPos].length) {
            const key = `${xPos},${yPos},${xDir},${yDir}`;
            if (seen[key]) {
                return true;
            }
            seen[key] = true;

            const nextC = grid[yPos + yDir]?.[xPos + xDir];
            if (nextC === "#") {
                if (xDir === 0 && yDir == -1) {
                    xDir = 1;
                    yDir = 0;
                } else if (xDir === 1 && yDir === 0) {
                    xDir = 0;
                    yDir = 1;
                } else if (xDir === 0 && yDir === 1) {
                    xDir = -1;
                    yDir = 0;
                } else if (xDir === -1 && yDir === 0) {
                    xDir = 0;
                    yDir = -1;
                }
            } else {
                xPos += xDir;
                yPos += yDir;
            }
        }

        return false;
    }

    let [xPos, yPos] = [-1, -1];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                xPos = j;
                yPos = i;
            }
        }
    }

    let [xDir, yDir] = [0, -1];

    let loops = new Set<string>();
    let seen = new Set<string>();

    while (xPos >= 0 && yPos >= 0 && yPos < grid.length && xPos < grid[yPos].length) {
        const nextC = grid[yPos + yDir]?.[xPos + xDir];

        if (nextC === "#") {
            if (xDir === 0 && yDir == -1) {
                xDir = 1;
                yDir = 0;
            } else if (xDir === 1 && yDir === 0) {
                xDir = 0;
                yDir = 1;
            } else if (xDir === 0 && yDir === 1) {
                xDir = -1;
                yDir = 0;
            } else if (xDir === -1 && yDir === 0) {
                xDir = 0;
                yDir = -1;
            }
        } else {
            if (nextC && nextC === ".") {
                const before = grid[yPos + yDir][xPos + xDir];
                grid[yPos + yDir][xPos + xDir] = "#"
                
                if (isLoop(grid, xPos, yPos, xDir, yDir)) {
                    loops.add([xPos + xDir, yPos + yDir].toString())
                }

                // backtrack
                grid[yPos + yDir][xPos + xDir] = before;
            }

            xPos += xDir;
            yPos += yDir;
        }
    }

    for (const loop of loops) {
        console.log(loop);
    }
    return loops.size;
};

// console.log(part1());
console.log(part2());
