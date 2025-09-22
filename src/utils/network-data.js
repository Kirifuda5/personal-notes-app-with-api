const BASE_URL = "https://notes-api.dicoding.dev/v1";

let accessToken = localStorage.getItem("accessToken") || "";

export function putAccessToken(token) {
  accessToken = token;
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return accessToken;
}

async function _fetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  let payload = null;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    payload = await res.json();
  } else {
    payload = await res.text();
  }
  if (!res.ok || (payload && payload.status === "fail")) {
    const message =
      (payload && (payload.message || payload.error)) || res.statusText;
    throw new Error(message);
  }
  return payload;
}

// Auth
export async function register({ name, email, password }) {
  const { status, message } = await _fetch("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return { status, message };
}

export async function login({ email, password }) {
  const { data } = await _fetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  putAccessToken(data.accessToken);
  return data;
}

export async function getUserLogged() {
  const { data } = await _fetch("/users/me");
  return data;
}

export function logout() {
  putAccessToken("");
}

// Notes
export async function getActiveNotes() {
  const { data } = await _fetch("/notes");
  return data;
}

export async function getArchivedNotes() {
  const { data } = await _fetch("/notes/archived");
  return data;
}

export async function getNote(id) {
  const { data } = await _fetch(`/notes/${id}`);
  return data;
}

export async function addNote({ title, body }) {
  const { data } = await _fetch("/notes", {
    method: "POST",
    body: JSON.stringify({ title, body }),
  });
  return data;
}

export async function deleteNote(id) {
  await _fetch(`/notes/${id}`, { method: "DELETE" });
}

export async function archiveNote(id) {
  await _fetch(`/notes/${id}/archive`, { method: "POST" });
}

export async function unarchiveNote(id) {
  await _fetch(`/notes/${id}/unarchive`, { method: "POST" });
}
