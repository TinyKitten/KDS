import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type RequestType = {
  type: "notify" | "post" | "speech";
};

type NotifyRequestBody = RequestType & {
  type: "notify";
  title: string;
  description: string;
  channel: string;
  urgent: boolean;
};

type PostRequestBody = {
  type: "post";
};

type SpeechRequestBody = {
  type: "speech";
};

type RequestBody = NotifyRequestBody | PostRequestBody | SpeechRequestBody;

const pool = new Pool(
  {
    tls: { enabled: false },
    database: "postgres",
    hostname: Deno.env.get("DB_HOSTNAME"),
    user: Deno.env.get("DB_USER"),
    port: 6543,
    password: Deno.env.get("DB_PASSWORD"),
  },
  1,
);

Deno.serve(async (req) => {
  try {
    const conn = await pool.connect();

    try {
      const body = (await req.json()) as RequestBody;
      const { type: hookType } = body;

      switch (hookType) {
        case "notify": {
          const { title, description, channel, urgent } = body;
          if (!title) {
            return new Response(null, {
              status: 400,
              headers: { "Content-Type": "application/json; charset=utf-8" },
            });
          }

          await conn
            .queryObject`INSERT INTO notifies (title, description, channel, urgent) VALUES (${title}, ${description}, ${channel}, ${urgent})`;
          return new Response(null, {
            status: 201,
            headers: { "Content-Type": "application/json; charset=utf-8" },
          });
        }
        case "post":
        case "speech":
          return new Response(null, {
            status: 501,
            headers: { "Content-Type": "application/json; charset=utf-8" },
          });
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
});
