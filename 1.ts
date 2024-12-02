import * as fs from 'fs';

const getInput = (): number[][] => {
    const filePath = "1-input.txt";
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data.split("\n").filter(line => line !== "");
    const l1: number[] = lines.map(line => Number(line.split(" ").at(0)));
    const l2: number[] = lines.map(line => Number(line.split(" ").at(-1)));
    return [l1, l2];
};

const part1 = () => {
    const [l1, l2] = getInput();
    l1.sort() && l2.sort();

    let totalDist = 0;
    l1.forEach((val, idx) => {
        totalDist += Math.abs(l1[idx] - l2[idx]);
    })

    return totalDist;
}

const part2 = () => {
    const [l1, l2] = getInput();

    const counts1: Record<number, number> = l1.reduce((acc, num) => {
        if(!acc[num]) {
            acc[num] = 0;
        }
        acc[num] += 1;
        return acc;
    }, {})
    const counts2: Record<number, number> = l2.reduce((acc, num) => {
        if(!acc[num]) {
            acc[num] = 0;
        }
        acc[num] += 1;
        return acc;
    }, {})

    let totalScore: number = 0;
    for (const k1 in counts1) {
        const val = parseInt(k1);
        const score = val * counts1[val] * (counts2[val] || 0);
        totalScore += score;
    }

    return totalScore;
}


console.log(part1());
console.log(part2());
