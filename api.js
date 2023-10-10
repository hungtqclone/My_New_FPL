export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YTZmZjUxNi0xNmU1LTQ1MDAtYjk0ZS03ODgwZTJjYjNlOTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NjI1MzE5OCwiZXhwIjoxNjk2ODU3OTk4fQ.an5PyPZd8KYWIB3wK3EaA_T7bnCQwemuHYLnBipW0jc"; // token should be in String format

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  console.log("room id", roomId);
  return roomId;
};
