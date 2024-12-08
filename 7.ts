import * as fs from "fs";
const input = fs.readFileSync("7-input.txt", "utf8");

// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`;

const lines = input.split("\n");

const solution = (isPart2: boolean) => {
    function dfs(target: number, cur: number, nums: number[]): boolean {
        if (cur > target) {
            return false;
        }
        if (nums.length === 0) {
            if (cur === target) {
                return true;
            }
            return false;
        }

        const nextNum = nums.at(0)!;
        const r1 = dfs(target, cur * nextNum, nums.slice(1));
        const r2 = dfs(target, cur + nextNum, nums.slice(1));
        const r3 = isPart2 ? dfs(target, Number(`${cur}${nextNum}`), nums.slice(1)) : false;

        return r1 || r2 || r3;
    }

    let total = 0;
    for (const line of lines) {
        const target = Number(line.split(":")[0]);
        const nums = line
            .split(": ")[1]
            .split(" ")
            .map((x) => Number(x));

        if (dfs(target, nums[0], nums.slice(1))) {
            total += target;
        }
    }

    return total;
};

console.log(solution(false));
console.log(solution(true));
