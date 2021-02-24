import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const HeaderTemplate = styled.header``;

const Logo = () => (
  <Link href="/">
    <Image
      src="/logo.svg" // Route of the image file
      alt="Crashcourse"
      width="100%"
      height="100%"
    />
  </Link>
);

export default function Header() {
  return (
    <HeaderTemplate>
      <div>
        <Logo></Logo>Crashcourse
      </div>
    </HeaderTemplate>
  );
}
