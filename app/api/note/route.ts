import z from "zod";
import { createRedisClient } from "../utils/createRedisClient";

const NoteValidationSchema = z.object({
  channel: z.string().optional(),
  data: z.object({
    id: z.string().optional(),
    heading: z.string(),
    text: z.string(),
    qrText: z.string().optional(),
    createdAt: z.number().optional(),
  }),
});

export async function GET(request: Request) {
  const redisClient = await createRedisClient();
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get("channel") || "everyone";

  try {
    const value = await redisClient.get(channel);

    if (!value) {
      return new Response(
        JSON.stringify({
          error: "Data not found for the specified channel",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = JSON.parse(value);

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
        error: "Failed to fetch data for the specified channel",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    redisClient.destroy();
  }
}

export async function POST(request: Request) {
  const redisClient = await createRedisClient();

  const { channel, data } = await request.json();
  const parsed = NoteValidationSchema.safeParse({ channel, data });

  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid data format",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  const { channel: parsedChannel, data: parsedData } = parsed.data;

  const channelToUse = parsedChannel || "everyone";
  const payload = JSON.stringify({
    ...parsedData,
    id: crypto.randomUUID(),
    channel: channelToUse,
    createdAt: Date.now(),
  });

  try {
    await Promise.all([
      redisClient.set(channelToUse, payload),
      redisClient.publish(channelToUse, payload),
    ]);

    return new Response(
      JSON.stringify({ message: "Data saved successfully" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to save data",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    redisClient.destroy();
  }
}
