export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(
      JSON.stringify({
        error: "Missing latitude or longitude",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(
      `https://maps.google.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=false&language=en&key=${process.env.GOOGLE_CLOUD_API_KEY}`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to fetch reverse geocoding data",
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch reverse geocoding data",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
