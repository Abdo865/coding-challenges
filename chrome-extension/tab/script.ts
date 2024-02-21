function updateTime() {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hoursElement = document.querySelector("#hours");
  console.log(hoursElement);

  if (hoursElement !== null)
    hoursElement.textContent = hours < 10 ? `0${hours}` : `${hours}`;

  const minutesElement = document.querySelector("#minutes");
  if (minutesElement !== null)
    minutesElement.textContent = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const secondsElement = document.querySelector("#seconds");
  if (secondsElement !== null)
    secondsElement.textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;
}

function updateDate() {
  const date = new Date();

  const year = date.getFullYear();
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format();

  const day = date.getDay();
  const dayName = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format();

  const dayElement = document.querySelector("#dayName");
  if (dayElement !== null) dayElement.textContent = `${dayName}, `;

  const monthElement = document.querySelector("#monthName");
  if (monthElement !== null) monthElement.textContent = `${monthName} ${day},`;

  const yearElement = document.querySelector("#year");
  if (yearElement !== null) yearElement.textContent = `${year}`;
}

async function fetchPRs() {
  const openPRs = await fetch(
    "https://api.github.com/repos/CodingChallegesFYI/SharedSolutions/pulls"
  );
  const prs = await openPRs.json();
  const prsTitle = prs.map((pr) => pr.title);

  const prList = document.querySelector("#prs");
  prs.forEach((pr, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${pr.title}`;
    prList?.appendChild(li);
  });
}

updateTime();
updateDate();
fetchPRs();

setInterval(updateTime, 1000);
setInterval(updateDate, 1000);
