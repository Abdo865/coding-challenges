import fs from "fs";

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  readAllFile(args[i]);
}

function readAllFile(file: string) {
  try {
    const data = fs.readFileSync(file, "utf-8");
    console.log(data);
  } catch (error: any) {
    if (error["errno"] === -2) {
      console.log(`cat: ${file}: No such file or directory`);
    }
  }
}
