const API_URL = import.meta.env.VITE_API_URL

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export async function fetchUserProfile(token) {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.json()
}

export async function updateUserProfile(token, userName) {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName }),
  })
  return response.json()
}
