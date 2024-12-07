import * as fs from "fs";

// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;
const input = fs.readFileSync("4-input.txt", "utf8");

const lines = input.split("\n");

const search = (i: number, j: number, nextChar: string, xDir: number, yDir: number): boolean => {
    i += yDir;
    j += xDir;

    if (i < 0 || j < 0) {
        return false;
    }
    if (i >= lines.length || j >= lines[i].length) {
        return false;
    }

    if (lines[i][j] !== nextChar) {
        return false;
    }

    if (nextChar === "S") {
        return true;
    }

    let newNextChar = "";
    if (nextChar === "M") {
        newNextChar = "A";
    }
    if (nextChar === "A") {
        newNextChar = "S";
    }

    return search(i, j, newNextChar, xDir, yDir);
};

const part1 = () => {
    let count: number = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const c = lines[i][j];
            if (c === "X") {
                search(i, j, "M", 0, 1) && (count += 1); // up
                search(i, j, "M", 1, 1) && (count += 1); // diag top-right
                search(i, j, "M", 1, 0) && (count += 1); // right
                search(i, j, "M", 1, -1) && (count += 1); // diag bottom-right
                search(i, j, "M", 0, -1) && (count += 1); // down
                search(i, j, "M", -1, -1) && (count += 1); // diag bottom-left
                search(i, j, "M", -1, 0) && (count += 1); // left
                search(i, j, "M", -1, 1) && (count += 1); // diag top-left
            }
        }
    }

    return count;
};

const part2 = () => {
    let count: number = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const c = lines[i][j];
            if (c === "A") {
                const tl = lines[i - 1]?.[j - 1];
                const br = lines[i + 1]?.[j + 1];

                const bl = lines[i + 1]?.[j - 1];
                const tr = lines[i - 1]?.[j + 1];

                const ltMatch = (tl === "M" && br === "S") || (tl === "S" && br === "M");
                const blMatch = (bl === "M" && tr === "S") || (bl === "S" && tr === "M");

                if (ltMatch && blMatch) {
                    count += 1;
                }
            }
        }
    }

    return count;
};

console.log(part1());
console.log(part2());
