//servics/groupService.js

const BASE_URL = "http://localhost:8080/api/groups";

export async function addGroup(groupData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupData),
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export async function joinGroup(joinData) {
  const res = await fetch(BASE_URL + "/join", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to join group");
  }
  return data;
}

export async function getGroupByCode(code) {
  const res = await fetch(BASE_URL + "/" + code, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
