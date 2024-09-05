import Link from "next/link";

export default function Footer() {
  return (
    <div className="mx-auto py-5 text-center text-sm">
      <div className="flex items-center justify-center">
        <div>Built by&nbsp;</div>
        <Link
          href={"https://x.com/kushagrasarathe"}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline"
        >
          @kushagrasarathe
        </Link>
        <div>and by&nbsp;</div>
        <Link
          href={"https://x.com/0xdhruva"}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline"
        >
          @0xdhruva
        </Link>
      </div>
    </div>
  );
}
