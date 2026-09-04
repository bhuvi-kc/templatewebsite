const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const clean = (value, limit) => String(value ?? "").trim().slice(0, limit);

export async function onRequestPost({ request, env }) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const name = clean(input.name, 120);
  const email = clean(input.email, 254).toLowerCase();
  const message = clean(input.message, 5000);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !message || !emailIsValid) {
    return json({ error: "Name, a valid email, and a message are required" }, 400);
  }
  if (!env.CONTACTS) {
    return json({ error: "Contact service is not configured" }, 503);
  }

  await env.CONTACTS.prepare(
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
  )
    .bind(name, email, message)
    .run();

  return json({ ok: true }, 201);
}

export function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}
