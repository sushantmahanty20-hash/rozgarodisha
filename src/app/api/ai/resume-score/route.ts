import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const resumeScoreSchema = z.object({
  resumeText: z.string().min(50, "Resume text is too short").max(20000),
  jobId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = resumeScoreSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { resumeText } = parsed.data;

    const sections = {
      hasContact: /[\w.-]+@[\w.-]+\.\w+/.test(resumeText),
      hasPhone: /[\+]?[\d\s\-\(\)]{7,}/.test(resumeText),
      hasExperience: /experience|work history|employment/i.test(resumeText),
      hasEducation: /education|degree|university|college|bachelor|master/i.test(resumeText),
      hasSkills: /skills|technologies|tools|proficient/i.test(resumeText),
      hasSummary: /summary|objective|profile/i.test(resumeText),
      wordCount: resumeText.split(/\s+/).length,
    };

    let score = 0;
    const feedback: Array<{ category: string; score: number; maxScore: number; message: string; type: "positive" | "warning" | "negative" }> = [];

    if (sections.hasContact) {
      score += 10;
      feedback.push({ category: "Contact", score: 10, maxScore: 10, message: "Contact information found", type: "positive" });
    } else {
      feedback.push({ category: "Contact", score: 0, maxScore: 10, message: "Add your email and phone number", type: "negative" });
    }

    if (sections.hasPhone) {
      score += 5;
      feedback.push({ category: "Phone", score: 5, maxScore: 5, message: "Phone number found", type: "positive" });
    } else {
      feedback.push({ category: "Phone", score: 0, maxScore: 5, message: "Consider adding a phone number", type: "warning" });
    }

    if (sections.hasSummary) {
      score += 15;
      feedback.push({ category: "Summary", score: 15, maxScore: 15, message: "Professional summary found", type: "positive" });
    } else {
      feedback.push({ category: "Summary", score: 0, maxScore: 15, message: "Add a professional summary section", type: "warning" });
    }

    if (sections.hasExperience) {
      score += 25;
      feedback.push({ category: "Experience", score: 25, maxScore: 25, message: "Work experience section found", type: "positive" });
    } else {
      feedback.push({ category: "Experience", score: 0, maxScore: 25, message: "Add your work experience", type: "negative" });
    }

    if (sections.hasEducation) {
      score += 15;
      feedback.push({ category: "Education", score: 15, maxScore: 15, message: "Education section found", type: "positive" });
    } else {
      feedback.push({ category: "Education", score: 0, maxScore: 15, message: "Add your educational background", type: "negative" });
    }

    if (sections.hasSkills) {
      score += 15;
      feedback.push({ category: "Skills", score: 15, maxScore: 15, message: "Skills section found", type: "positive" });
    } else {
      feedback.push({ category: "Skills", score: 0, maxScore: 15, message: "Add a skills section", type: "negative" });
    }

    if (sections.wordCount >= 300 && sections.wordCount <= 1000) {
      score += 15;
      feedback.push({ category: "Length", score: 15, maxScore: 15, message: "Good resume length (" + sections.wordCount + " words)", type: "positive" });
    } else if (sections.wordCount < 300) {
      score += 5;
      feedback.push({ category: "Length", score: 5, maxScore: 15, message: "Resume is too short (" + sections.wordCount + " words). Add more details.", type: "warning" });
    } else {
      score += 10;
      feedback.push({ category: "Length", score: 10, maxScore: 15, message: "Resume may be too long (" + sections.wordCount + " words). Consider trimming.", type: "warning" });
    }

    const scoreLabel =
      score >= 85 ? "Excellent" :
      score >= 70 ? "Good" :
      score >= 50 ? "Fair" : "Needs Improvement";

    return NextResponse.json({
      data: {
        overallScore: score,
        maxScore: 100,
        label: scoreLabel,
        feedback,
        sections,
      },
    });
  } catch (error) {
    console.error("POST /api/ai/resume-score error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
