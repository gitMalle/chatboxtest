import { motion } from "motion/react";
import cn from "classnames";
import { md } from "@/utils/markdown";

export const ChatMessage = ({
	content,
	isUser,
}: {
	content: string;
	isUser: boolean;
}) => {
	return (
		<motion.div
			className={cn("break-words", {
				"self-end bg-slate-800 max-w-1/2 rounded-lg px-4 py-2": isUser,
			})}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.2,
				ease: "easeOut",
			}}
		>
			{isUser ? (
				content
			) : (
				<div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
			)}
		</motion.div>
	);
};
