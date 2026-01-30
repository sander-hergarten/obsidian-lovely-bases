import {
  MarkdownRenderer,
  type TFile
} from "obsidian";
import { type CSSProperties, createElement, useEffect, useRef } from "react";
import { useObsidian } from "./Context";

type Props = {
	as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
  maxLength?: number;
	file: TFile;
  style?: CSSProperties;
  showEllipsis?: boolean;
};

const removeFrontmatter = (markdown: string) => markdown.replace(/^---\n[\s\S]*?\n---\n?/, "")

const getContentToRender = (markdown: string, maxLength: number, showEllipsis: boolean) => {
  const content = removeFrontmatter(markdown);
  return content.slice(0, maxLength) + (showEllipsis && content.length > maxLength ? "..." : "");
};

const Markdown = ({ as = "div", className, file, maxLength, style, showEllipsis = false }: Props) => {
	const { app, component } = useObsidian();

	const el = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!el.current) {
			return;
		}

		app.vault.read(file).then((md) => {
			if (!el.current || !md) {
				return;
			}

      // Clear previous content before rendering new content
      el.current.innerHTML = "";

			const contentToRender = maxLength ? getContentToRender(md, maxLength, showEllipsis) : md;

			void MarkdownRenderer.render(app, contentToRender, el.current, file.path, component);
		});
	}, [app, file, component, maxLength, showEllipsis]);

	return createElement(as, { ref: el, className, style });
};

export default Markdown;
