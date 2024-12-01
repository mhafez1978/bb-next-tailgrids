export const revalidate = 60;

export async function GET() {
  const data = await fetch(
    "https://api.blooming-brands.com/wp-json/wp/v2/users/"
  );
  const users = await data.json();

  return Response.json(users);
}
