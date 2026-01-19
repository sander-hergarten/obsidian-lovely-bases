
import { cn } from "@/lib/utils";
import { setIcon } from "obsidian";
import { useEffect, useRef } from "react";

type Props = {
	name: string;
	className?: string;
	style?: React.CSSProperties;
};

const normalizeLucideName = (name: string) => {
	const camel = name
		.trim()
		.replace(/(^\w|[-_\s]+\w)/g, (m) => m.replace(/[-_\s]+/, "").toLowerCase());
	return camel;
};

const LucideIcon = ({ name, className, style }: Props) => {
	const key = normalizeLucideName(name);
	const el = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!el.current) {
			return;
		}

		el.current.innerHTML = "";
		setIcon(el.current, key);

		return () => {
			if (el.current) {
				el.current.innerHTML = "";
			}
		};
	}, [key]);

	return (
		<span
			ref={el}
			className={cn("[&>svg]:size-full", className)}
			style={style}
		/>
	);
};

export default LucideIcon;
