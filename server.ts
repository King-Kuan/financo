/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bypassing strict type checking for the environment-specific SDK version
const genAI = new (GoogleGenAI as any)(process.env.GEMINI_API_KEY || '');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes (The "Functions" Layer) ---

  // Financo AI Advisor Endpoint
  app.post("/api/advisor", async (req, res) => {
    try {
      const { businessData, question } = req.body;
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        You are "Financo Intelligence", a specialized financial advisor for SMEs in Rwanda.
        
        Context provided from business:
        ${JSON.stringify(businessData)}
        
        User question/task:
        ${question || "Provide a summary analysis of this business performance."}
        
        Rules:
        1. Be professional, direct, and encouraging.
        2. Use RWF as currency.
        3. Refer to local contexts like Rwanda tax rules (RSSB, PAYE) if relevant.
        4. Focus on cash flow and stock optimization.
        5. Output in clean Markdown.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      res.json({ advice: responseText });
    } catch (error: any) {
      console.error("AI Advisor Error:", error);
      res.status(500).json({ error: "Failed to generate financial intelligence. Check API connection." });
    }
  });

  // Business Approval Simulation
  app.post("/api/admin/approve", async (req, res) => {
     const { bizId } = req.body;
     console.log(`[Palace Backend] Approving business ${bizId}. Triggering WhatsApp confirmation...`);
     res.json({ status: "success", message: "WhatsApp invitation sent to owner." });
  });

  // --- Vite / Static Serving ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:3000`);
  });
}

startServer();
