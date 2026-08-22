/**
 * 全站外链的单点定义（FR-7.1）。
 *
 * `visibility` 标注匿名访客能否打开（FR-7.2）：
 * - "public"    未登录可访问，上线前实测过
 * - "unchecked" 尚未实测
 */
type Link = { href: string; visibility: "public" | "unchecked" };

export const LINKS = {
  linkedin: { href: "https://linkedin.com/in/huzhi", visibility: "public" },
  github: { href: "https://github.com/huzhi-zhao", visibility: "public" },

  uoipRepo: {
    href: "https://github.com/huzhi-zhao/urban-ops-intelligence-platform",
    visibility: "public",
  },
  toucanShelfRepo: {
    href: "https://github.com/huzhi-zhao/toucan-shelf",
    visibility: "public",
  },
  mesDemo: { href: "https://mes.huzhi.dev/en/", visibility: "unchecked" },
  mesClient: { href: "http://www.shtipo.com/en/", visibility: "unchecked" },
  iconApp: {
    href: "https://github.com/tigerai-tech/folder-icon-management",
    visibility: "public",
  },
  iconPipeline: {
    href: "https://github.com/tigerai-tech/folder-icon-annotation",
    visibility: "public",
  },
} as const satisfies Record<string, Link>;

export type LinkKey = keyof typeof LINKS;
