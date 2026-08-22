import React from "react";

/**
 * 内容层是纯字符串（lib/content/*.ts），这里把三种行内标记还原成节点：
 *   {{60M+}}  量化指标   **文字**  强调   `code`  等宽
 * 之所以不用 Markdown 库：只有这三种，且要保证 P2 改文案时不会顺手引入新语法。
 */
const TOKEN = /(\{\{[^}]+\}\}|\*\*[^*]+\*\*|`[^`]+`)/g;

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("{{")) {
          return (
            <span key={i} className="font-mono text-[13.5px] font-medium text-accent">
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith("**")) {
          return (
            <b key={i} className="font-medium text-white/[0.82]">
              {part.slice(2, -2)}
            </b>
          );
        }
        if (part.startsWith("`")) {
          return (
            <code key={i} className="font-mono text-[13px] text-white/[0.7]">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
