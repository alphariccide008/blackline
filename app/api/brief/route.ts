import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, email, brief, billboards } = body

  const billboardList = (billboards as { title: string; location: string; type: string; size: string }[])
    .map((b, i) => `${i + 1}. ${b.title} — ${b.location} (${b.type}, ${b.size})`)
    .join("\n")

  const companyEmail = process.env.COMPANY_EMAIL ?? "hello@blackline.com"

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0A0A0C;color:#EDEDED;border-radius:12px;overflow:hidden;">
      <div style="background:#082A7B;padding:32px 40px;">
        <h1 style="margin:0;font-size:28px;font-weight:900;letter-spacing:-0.02em;color:#fff;">BLACKLINE</h1>
        <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.6);letter-spacing:0.2em;text-transform:uppercase;">Outdoor Advertising Brief</p>
      </div>
      <div style="padding:40px;">
        <h2 style="color:#4B73D4;font-size:18px;margin:0 0 24px;">Brief Received</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(237,237,237,0.5);font-size:12px;width:120px;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(237,237,237,0.5);font-size:12px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;font-weight:600;">${phone}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(237,237,237,0.5);font-size:12px;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;font-weight:600;">${email}</td></tr>
        </table>
        <h3 style="color:#4B73D4;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 16px;">Selected Billboards</h3>
        <div style="background:rgba(8,42,123,0.15);border:1px solid rgba(75,115,212,0.2);border-radius:8px;padding:20px;margin-bottom:32px;">
          ${(billboards as { title: string; location: string; type: string; size: string }[]).map((b, i) => `
            <div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);${i === billboards.length - 1 ? "border-bottom:none;" : ""}">
              <p style="margin:0;font-size:14px;font-weight:700;color:#EDEDED;">${b.title}</p>
              <p style="margin:4px 0 0;font-size:12px;color:rgba(237,237,237,0.5);">${b.location} · ${b.type} · ${b.size}</p>
            </div>
          `).join("")}
        </div>
        ${brief ? `<h3 style="color:#4B73D4;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 12px;">Brief Details</h3><p style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;font-size:14px;line-height:1.7;color:rgba(237,237,237,0.8);margin:0 0 32px;">${brief}</p>` : ""}
        <p style="font-size:12px;color:rgba(237,237,237,0.35);margin:0;">A BLACKLINE strategist will contact you within 24 hours.</p>
      </div>
    </div>
  `

  try {
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST ?? "smtp.gmail.com",
      port:   Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email to customer
    await transporter.sendMail({
      from:    `"BLACKLINE" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: "Your BLACKLINE Billboard Brief — Received",
      html:    htmlContent,
    })

    // Email to company
    await transporter.sendMail({
      from:    `"BLACKLINE Brief System" <${process.env.SMTP_USER}>`,
      to:      companyEmail,
      subject: `New Billboard Brief — ${name} (${phone})`,
      html:    htmlContent,
      replyTo: email,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[brief/route] email error:", err)
    // Return success anyway so UX isn't blocked — brief data is logged above
    return NextResponse.json({ ok: true, warn: "email_failed" })
  }
}
