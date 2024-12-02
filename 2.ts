import * as fs from 'fs';

const getInput = (): number[][] => {
    const filePath = "2-input.txt";
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data.split("\n");
    const reports = lines.map(line => line.split(" ").map(x => parseInt(x)));
    
    return reports;
};

const part1 = () => {
    const reports = getInput();
    const safeReports = reports.filter((report) => isSafe(report))
    return safeReports.length;
}

const isSafe = (report: number[]): boolean => {
    let prevNum = report[0];
    let direction = (report[1] - report[0]) > 0 ? 1 : -1;

    for (const num of report.slice(1)) {
        const diff = num - prevNum;
        if (diff > 0 && direction !== 1) {
            return false;
        } 
        if (diff < 0 && direction !== -1) {
            return false;
        } 
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
        prevNum = num;
    }

    return true;
}

const part2 = () => {
    const reports = getInput();

    const safeReports = reports.filter((report) => {
        if (isSafe(report)) {
            return true;
        }

        for (let i=0; i<report.length; i++) {
            const reportWithElemRemoved = [...report.slice(0, i), ...report.slice(i+1)];
            const tmp = isSafe(reportWithElemRemoved);
            if (tmp) {
                return true;
            }
        }

        return false;
    })

    return safeReports.length;
}

console.log(part1());
console.log(part2());
