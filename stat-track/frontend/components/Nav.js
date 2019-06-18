import Link from "next/link";

export const Nav = () => (
  <div>
    <Link href="/sell">
      <a>Sell!</a>
    </Link>
    <Link href="/">
      <a>Home!</a>
    </Link>
  </div>
);
