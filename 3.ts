import * as fs from "fs";

// const input = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
// const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const input = fs.readFileSync("3-input.txt", 'utf8');

const part1 = () => {
    const regexStr = "mul\\([0-9]+,[0-9]+\\)";
    const regex = new RegExp(regexStr, "g");

    const groups = input.match(regex);

    return groups?.reduce((acc, s) => {
        const nums = s
            .split("(")[1]
            .split(")")[0]
            .split(",")
            .map((x) => Number(x));
        const res = nums[0] * nums[1];
        return acc + res;
    }, 0);
};

const part2 = () => {
    const regexStr = "mul\\([0-9]+,[0-9]+\\)|don\\'t\\(\\)|do\\(\\)";
    const regex = new RegExp(regexStr, "g");

    const groups = input.match(regex);
    let enabled = true;

    return groups?.reduce((acc, s) => {
        if (s === "do()") {
            enabled = true;
            return acc;
        }
        if (s === "don't()") {
            enabled = false;
            return acc;
        }
        if (enabled) {
            const nums = s
                .split("(")[1]
                .split(")")[0]
                .split(",")
                .map((x) => Number(x));
            const res = nums[0] * nums[1];
            return acc + res;
        }
        return acc;
    }, 0);
};

console.log(part1());
console.log(part2());
