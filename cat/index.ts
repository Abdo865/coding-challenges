import fs from "fs";

const args = process.argv.slice(2);

let lineNum = false,
  blankNum = false,
  data = "",
  files: string[] = [];

handleInput(args);

function handleInput(args: string[]) {
  if (args[0] === "-n") {
    lineNum = true;
    args.shift();
  } else if (args[0] === "-b") {
    blankNum = true;
    args.shift();
  }
  if (!process.stdin.isTTY) {
    data = readFromStdin();
  } else {
    files = args;
    for (let i = 0; i < files.length; i++) data += readAllFile(files[i]);
  }
  if (lineNum || blankNum) data = addLineNum(data, blankNum);
  console.log(data);
}

function readAllFile(file: string): string {
  try {
    const fileData = fs.readFileSync(file, "utf-8");
    return fileData;
  } catch (error: any) {
    if (error["errno"] === -2)
      throw new Error(`cat: ${file}: No such file or directory`);
    else throw new Error(`cat: ${file}: ${error}`);
  }
}

function readFromStdin(): string {
  const inputData = fs.readFileSync(process.stdin.fd, "utf-8");
  return inputData;
}

function addLineNum(data: string, blankNum: boolean): string {
  let lines = data.split("\n");
  let lineNum = 1;
  for (let i = 0; i < lines.length; i++) {
    if (blankNum && lines[i].trim() === "") continue;
    lines[i] = `${(lineNum++).toString().padStart(6, " ")}  ${lines[i]}`;
  }
  return lines.join("\n");
}
