export async function POST(req) {
  const body = await req.json();
  
  const response = await fetch('https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/vertex-ai/google-gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': '0Ws2MAmAseTl39JZLohswZZgWLCxpZ1K'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return Response.json(data);
} 