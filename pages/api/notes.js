// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
      if (response.ok) {
        res
          .status(201)
          .json({ status: "Success", message: "Note added successfully" });
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "Failed to add note" });
      }
    }
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
}
