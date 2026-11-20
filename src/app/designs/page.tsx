import type { Metadata } from "next";
import DesignEditor from "@/components/designs/editor";

export const metadata: Metadata = {
  title: "Design files — Diya Chauhan",
  description:
    "Browse Diya Chauhan's Figma design files in a Figma-style workspace: WildMind AI, FLYBIT Dynamics, IncsSmart and more.",
};

export default function DesignsPage() {
  return <DesignEditor />;
}
