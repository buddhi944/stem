import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, phone, subject, message } = parsed.data;

  req.log.info(
    { name, email, phone: phone ?? null, subject: subject ?? null },
    "Contact form submission received"
  );

  res.status(200).json({
    success: true,
    message:
      "Thank you for reaching out! We have received your message and will get back to you shortly.",
  });
});

export default contactRouter;
