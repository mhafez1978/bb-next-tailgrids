import { NextRequest, NextResponse } from "next/server";

const servicesKnowledge = {
  1: {
    name: "Website Design Service",
    description:
      "We offer tailored website design and website re-design solutions that help your business rank higher.",
    url: "https://blooming-brands.com/services/website-design",
    keywords: [
      "website design",
      "web design",
      "web development",
      "website",
      "web site",
    ],
  },
  2: {
    name: "Custom WordPress Theme Development",
    description:
      "We customize WordPress Themes to match your exact vision and needs.",
    url: "https://blooming-brands.com/services/wordpress-development",
    keywords: [
      "wordpress theme development",
      "WordPress theme",
      "wp theme",
      "wp themes",
      "wordpress themes",
      "wp theme development",
      "wp",
      "wordpress",
    ],
  },
  3: {
    name: "Custom WordPress Plugin Development",
    description:
      "We extend your business functionality beyond WordPress core functionality by custom designed plugins.",
    url: "https://blooming-brands.com/services/wordpress-development",
    keywords: [
      "wordpress plugin development",
      "WordPress plugin",
      "wp plugin",
      "wp plugins",
      "wordpress plugins",
      "wp plugin development",
      "wp",
      "wordpress",
    ],
  },
  4: {
    name: "SEO Services",
    description:
      "Our SEO services include both on-page and off-page optimization to improve your website’s visibility.",
    url: "https://blooming-brands.com/services/search-engine-optimization",
    keywords: [
      "seo",
      "search engine optimization",
      "search engine",
      "optimization",
      "google ranking",
      "google seo",
      "seo services",
      "on-page seo",
      "off-page seo",
      "seo optimization",
    ],
  },
  5: {
    name: "Online Marketing",
    description:
      "We provide comprehensive monthly online marketing plans, including SEO, PPC, Google Ads, social media, and content creation.",
    url: "https://blooming-brands.com/services/online-marketing",
    keywords: [
      "online marketing",
      "digital marketing",
      "internet marketing",
      "marketing",
      "online advertising",
      "online ads",
      "online promotion",
      "online campaigns",
      "online marketing services",
      "online marketing plans",
      "online marketing strategy",
    ],
  },
  6: {
    name: "Pay Per Click Campaigns",
    description:
      "We provide comprehensive monthly PPC campaigns, including Google Ads, social media ads, and more.",
    url: "https://blooming-brands.com/services/pay-per-click",
    keywords: [
      "ppc",
      "pay per click",
      "google ads",
      "adwords",
      "ppc campaigns",
      "ppc services",
      "ppc management",
      "ppc advertising",
      "ppc marketing",
    ],
  },
};

function findServiceByKeyword(message: string) {
  const lowercasedMessage = message.toLowerCase();
  for (const service of Object.values(servicesKnowledge)) {
    if (
      service.keywords.some((keyword) => lowercasedMessage.includes(keyword))
    ) {
      return service;
    }
  }
  return null;
}

async function emailChatHistory({
  name,
  phone,
  email,
  services,
}: {
  name: string;
  phone: string;
  email: string;
  services: string;
}) {
  const emailResponse = await fetch(
    "https://blooming-brands.com/api/send-email",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: name,
        lastName: "",
        email,
        phone,
        message: `User is interested in the following service(s): ${services}`,
      }),
    }
  );

  if (!emailResponse.ok) {
    throw new Error("Failed to send chat history email.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, context = {}, formData = null } = await req.json();

    // Handle form submission
    if (formData) {
      const { name, phone, email, services } = formData;

      // Simulate email sending
      await emailChatHistory({ name, phone, email, services });

      const successMessage = `
        <p>Thank you! We've received your details: <br/>
        Name: ${name}, Phone: ${phone}, Email: ${email}, Services: ${services}.</p>
        <p>A team member will contact you shortly. Is there anything else I can help you with?</p>
      `;

      context.chatHistory = context.chatHistory || [];
      context.chatHistory.push({
        userMessage: "Form Submitted",
        botReply: successMessage,
      });

      context.nextAction = "endChat";
      return NextResponse.json({ reply: successMessage, context });
    }

    // Handle keyword matching
    const matchedService = findServiceByKeyword(message);
    if (matchedService) {
      const responseMessage = `
        <p>Ah..., I think you're interested in: <strong>${matchedService.name}</strong></p>
        <hr/>
        <p>${matchedService.description}</p>
        <hr>
        <p><a href="${matchedService.url}" target="_blank" rel="noopener noreferrer">${matchedService.url}</a></p>
        <p>Would you like to schedule a discovery call to discuss your requirements in details ? (Yes/No)</p>
      `;

      context.chatHistory = context.chatHistory || [];
      context.chatHistory.push({
        userMessage: message,
        botReply: responseMessage,
      });

      context.nextAction = "scheduleCall";
      return NextResponse.json({ reply: responseMessage, context });
    }

    // Handle scheduling
    if (context.nextAction === "scheduleCall" && /yes|ok|sure/i.test(message)) {
      context.nextAction = "collectDetails";
      return NextResponse.json({
        reply: "Please provide your details.",
        context,
      });
    }

    // End chat if no further questions
    if (context.nextAction === "endChat" && /no|nothing/i.test(message)) {
      return NextResponse.json({
        reply: "<p>Thank you! Have a great day!</p>",
        context,
      });
    }

    function isGreeting(message: string) {
      const greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "howdy",
        "greetings",
        "what's up",
        "sup",
        "yo",
        "heya",
        "hi there",
        "hello there",
        "good day",
        "good day to you",
        "good to see you",
        "nice to see you",
        "nice to meet you",
        "pleased to meet you",
        "how are you",
        "how do you do",
        "howdy do",
        "how's it going",
        "how's everything",
        "how's life",
        "how's your day",
        "how's your day going",
        "how's your day been",
      ];
      const lowercasedMessage = message.toLowerCase();
      return greetings.some((greeting) => lowercasedMessage.includes(greeting));
    }

    if (isGreeting(message)) {
      const greetingResponse = `
        <p class="mb-4">Hello, I can provide assistance with any questions you may have relvant to our services listed below:</p>
        <ul class="mb-6">
          ${Object.values(servicesKnowledge)
            .map(
              (service) =>
                `<li><a href="${service.url}" target="_blank" style="color: #4CAF50; text-decoration: underline;">${service.name}</a></li>`
            )
            .join("")}
        </ul>
        <p>Please let me know how I can assist understand our solutions, or simply click on one of the services above for more information.</p>
      `;
      context.chatHistory = context.chatHistory || [];
      context.chatHistory.push({
        userMessage: message,
        botReply: greetingResponse,
      });
      return NextResponse.json({ reply: greetingResponse, context });
    }

    // Default fallback message
    const fallbackMessage = `
    <p>I'm sorry, I couldn't find a matching service. Here are some services we offer:</p>
    <ul>
      ${Object.values(servicesKnowledge)
        .map(
          (service) =>
            `<li><a href="${service.url}" target="_blank" style="color: #4CAF50; text-decoration: underline;">${service.name}</a></li>`
        )
        .join("")}
    </ul>
    <p>Please provide more details about what you're looking for, or click on one of the services above for more information.</p>
  `;

    return NextResponse.json({ reply: fallbackMessage, context });
  } catch (error) {
    console.error("Error handling chatbot request:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
