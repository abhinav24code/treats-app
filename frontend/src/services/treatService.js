//servics/treatService.js

const BASE_URL = "/api/treats";

export async function addTreat(treatData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(treatData),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getTreatsByGroup(code) {
  const response = await fetch(BASE_URL + "/" + code, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getLeaderboard(code) {
  const response = await fetch(BASE_URL + "/leaderboard/" + code, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function deleteTreat(code) {
  const response = await fetch(BASE_URL + "/" + code, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function updateTreat(id, treatData) {
  const response = await fetch(BASE_URL + "/" + id, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(treatData),
  });
  const data = await response.json();

  console.log(data);
  return data;
}
