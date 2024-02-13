"use client";

import Button from "@/components/general/Button";
import { styled } from "styled-components";

export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const LayoutFooter = (props: LayoutFooterProps) => {
  const { className = "", ...restProps } = props;

  return (
    <LayoutFooterContainer className={`${className}`} {...restProps}>
      <div className="inner">
        <LayoutFooterLink>
          <ul className="link-policy">
            <li>
              <Button
                as="a"
                href="#"
                shape="plain"
                variants="secondary"
                emphasis="minimal"
              >
                이용약관
              </Button>
            </li>
            <li>
              <Button
                as="a"
                href="#"
                shape="plain"
                variants="secondary"
                emphasis="minimal"
              >
                개인정보처리방침
              </Button>
            </li>
          </ul>
        </LayoutFooterLink>
        <LayoutFooterCopyright>
          <span>&copy; {new Date().getFullYear()} Challenge With Me.</span>
          <span>All rights reserved.</span>
        </LayoutFooterCopyright>
      </div>
    </LayoutFooterContainer>
  );
};

const LayoutFooterLink = styled.div`
  .link-policy {
    display: flex;
    justify-content: center;
    a {
      padding: 0 8px;
    }
  }
`;

const LayoutFooterCopyright = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  span {
    padding: 0 0.2em;
    color: rgb(var(--color-gray400));
  }
`;

const LayoutFooterContainer = styled.footer`
  > .inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1280px;
    padding: 48px 32px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    > .inner {
      padding: 32px 16px;
    }
  }
`;

export default LayoutFooter;
