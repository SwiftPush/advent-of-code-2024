import * as fs from "fs";

// const input = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;
const input = fs.readFileSync("5-input.txt", "utf8");

const lines = input.split("\n");

const part1 = () => {
    const rules = lines.filter((line) => line.includes("|")).map((line) => line.split("|").map((nums) => Number(nums)));
    const updates = lines.filter((line) => line.includes(",")).map((line) => line.split(",").map((nums) => Number(nums)));

    let sum = 0;
    for (const update of updates) {
        const relevantRules = rules.filter((rule) => {
            return update.includes(rule[0]) && update.includes(rule[1]);
        });
        const correctOrder = relevantRules.every((rule) => update.indexOf(rule[0]) < update.indexOf(rule[1]));
        if (correctOrder) {
            sum += update.at(Math.floor(update.length / 2))!;
        }
    }

    return sum;
};

const part2 = () => {
    const rules = lines.filter((line) => line.includes("|")).map((line) => line.split("|").map((nums) => Number(nums)));
    const updates = lines.filter((line) => line.includes(",")).map((line) => line.split(",").map((nums) => Number(nums)));

    function isCorrectOrder(rules: number[][], update: number[]): boolean {
        return rules.every((rule) => update.indexOf(rule[0]) < update.indexOf(rule[1]));
    }

    function arrayMove(nums: number[], from: number, to: number) {
        const e = nums[from];
        nums.splice(from, 1);
        nums.splice(to, 0, e);
    }

    let sum = 0;
    for (const update of updates) {
        const relevantRules = rules.filter((rule) => {
            return update.includes(rule[0]) && update.includes(rule[1]);
        });
        const correctOrder = isCorrectOrder(relevantRules, update);
        if (correctOrder) {
            continue;
        }

        while (!isCorrectOrder(relevantRules, update)) {
            for (const rule of relevantRules) {
                const [a, b] = [update.indexOf(rule[0]), update.indexOf(rule[1])];
                const ok = a < b;
                if (!ok) {
                    arrayMove(update, b, a); // move b in front of a
                }
            }
        }

        sum += update.at(Math.floor(update.length / 2))!;
    }

    return sum;
};

console.log(part1());
console.log(part2());
