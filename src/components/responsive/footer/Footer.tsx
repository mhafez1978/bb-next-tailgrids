import Image from "next/image";
import React, { ReactNode } from "react";

const Footer = () => {
  return (
    <footer className="absolute w-screen z-40 bg-[url('/footer-bg.png')] bg-cover bg-center-bottom bg-no-repeat lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-2/3 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <a
                href="/"
                className={
                  " fascinate-inline-regular mb-6 inline-block max-w-[360px] text-3xl text-white font-semibold"
                }
              >
                Blooming Brands
              </a>
              <p className="mb-7 text-white text-gray-1">
                We create digital experiences for brands and companies by using
                technology.
              </p>
              <div className="-mx-3 flex items-center">
                <a
                  href="https://www.facebook.com/profile.php?id=61568859597363"
                  className="px-3 text-gray-1 hover:text-white"
                  target="_blank"
                >
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    className="fill-[#ffffff]"
                  >
                    <path d="M9.00007 6.82105H7.50006H6.96434V6.27097V4.56571V4.01562H7.50006H8.62507C8.91971 4.01562 9.16078 3.79559 9.16078 3.46554V0.550085C9.16078 0.247538 8.9465 0 8.62507 0H6.66969C4.55361 0 3.08038 1.54024 3.08038 3.82309V6.21596V6.76605H2.54466H0.72322C0.348217 6.76605 0 7.06859 0 7.50866V9.48897C0 9.87402 0.294645 10.2316 0.72322 10.2316H2.49109H3.02681V10.7817V16.31C3.02681 16.6951 3.32145 17.0526 3.75003 17.0526H6.26791C6.42862 17.0526 6.56255 16.9701 6.66969 16.8601C6.77684 16.7501 6.8572 16.5576 6.8572 16.3925V10.8092V10.2591H7.4197H8.62507C8.97328 10.2591 9.24114 10.0391 9.29471 9.709V9.6815V9.65399L9.66972 7.7562C9.6965 7.56367 9.66972 7.34363 9.509 7.1236C9.45543 6.98608 9.21436 6.84856 9.00007 6.82105Z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/BloomingBrands"
                  className="px-3 text-gray-1 hover:text-white"
                  target="_blank"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    className="fill-[#ffffff]"
                  >
                    <path
                      d="M2 2L17 17M2 17L17 2"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/bloomingbrands/"
                  className="px-3 text-gray-1 hover:text-white"
                  target="_blank"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="fill-[#ffffff]"
                  >
                    <path d="M8.91688 12.4995C10.6918 12.4995 12.1306 11.0911 12.1306 9.35385C12.1306 7.61655 10.6918 6.20819 8.91688 6.20819C7.14197 6.20819 5.70312 7.61655 5.70312 9.35385C5.70312 11.0911 7.14197 12.4995 8.91688 12.4995Z" />
                    <path d="M12.4078 0.947388H5.37075C2.57257 0.947388 0.300781 3.17104 0.300781 5.90993V12.7436C0.300781 15.5367 2.57257 17.7604 5.37075 17.7604H12.3524C15.2059 17.7604 17.4777 15.5367 17.4777 12.7978V5.90993C17.4777 3.17104 15.2059 0.947388 12.4078 0.947388ZM8.91696 13.4758C6.56206 13.4758 4.70584 11.6047 4.70584 9.35389C4.70584 7.10312 6.58976 5.23199 8.91696 5.23199C11.2165 5.23199 13.1004 7.10312 13.1004 9.35389C13.1004 11.6047 11.2442 13.4758 8.91696 13.4758ZM14.735 5.61164C14.4579 5.90993 14.0423 6.07264 13.5714 6.07264C13.1558 6.07264 12.7402 5.90993 12.4078 5.61164C12.103 5.31334 11.9368 4.9337 11.9368 4.47269C11.9368 4.01169 12.103 3.65916 12.4078 3.33375C12.7125 3.00834 13.1004 2.84563 13.5714 2.84563C13.9869 2.84563 14.4302 3.00834 14.735 3.30663C15.012 3.65916 15.2059 4.06593 15.2059 4.49981C15.1782 4.9337 15.012 5.31334 14.735 5.61164Z" />
                    <path d="M13.5985 3.82184C13.2383 3.82184 12.9336 4.12013 12.9336 4.47266C12.9336 4.82519 13.2383 5.12349 13.5985 5.12349C13.9587 5.12349 14.2634 4.82519 14.2634 4.47266C14.2634 4.12013 13.9864 3.82184 13.5985 3.82184Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/blooming-brands/"
                  className="px-3 text-gray-1 hover:text-white"
                  target="_blank"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="fill-[#ffffff]"
                  >
                    <path d="M16.7821 0.947388H1.84847C1.14272 0.947388 0.578125 1.49747 0.578125 2.18508V16.7623C0.578125 17.4224 1.14272 18 1.84847 18H16.7257C17.4314 18 17.996 17.4499 17.996 16.7623V2.15757C18.0525 1.49747 17.4879 0.947388 16.7821 0.947388ZM5.7442 15.4421H3.17528V7.32837H5.7442V15.4421ZM4.44563 6.2007C3.59873 6.2007 2.94944 5.5406 2.94944 4.74297C2.94944 3.94535 3.62696 3.28525 4.44563 3.28525C5.26429 3.28525 5.94181 3.94535 5.94181 4.74297C5.94181 5.5406 5.32075 6.2007 4.44563 6.2007ZM15.4835 15.4421H12.9146V11.509C12.9146 10.5739 12.8864 9.33618 11.5596 9.33618C10.2045 9.33618 10.0069 10.3813 10.0069 11.4265V15.4421H7.438V7.32837H9.95046V8.45605H9.9787C10.3457 7.79594 11.1644 7.13584 12.4347 7.13584C15.0601 7.13584 15.54 8.7861 15.54 11.0414V15.4421H15.4835Z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@bostonbloomingbrands"
                  className="px-3 text-gray-1 hover:text-white"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    className="fill-[#ffffff]"
                  >
                    <path d="M35.09 13.91a9.78 9.78 0 0 1-2.1-6.09h-4.86v24.66a8.45 8.45 0 1 1-8.45-8.45 8.73 8.73 0 0 1 3.57.76v-5.3a15.88 15.88 0 0 0-3.57-.4 14.94 14.94 0 1 0 14.94 14.94V18.86a9.9 9.9 0 0 0 4.44 1.1v-5.31a9.83 9.83 0 0 1-4.01-1.74Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <LinkGroup header="Company">
            <NavLink link="/about" label="About company" />
            <NavLink link="/services" label="Company services" />
            {/* <NavLink link="/#" label="Job opportunities" /> */}
            {/* <NavLink link="/#" label="Creative people" /> */}
          </LinkGroup>
          <LinkGroup header="Customer">
            <NavLink link="/contact" label="Client support" />
            <NavLink link="/latest-news" label="Latest news" />
            {/* <NavLink link="/#" label="Company story" />
            <NavLink link="/#" label="Pricing packages" /> */}
          </LinkGroup>

          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white uppercase">
                Latest News
              </h4>
              <a
                href="/latest-news"
                className="mb-8 flex items-center text-gray-1 hover:text-white"
              >
                <div className="mr-5 w-full max-w-[70px] overflow-hidden rounded">
                  <Image
                    src="https://cdn.tailgrids.com/2.0/image/application/images/footers/footer-04/blog-01.jpg"
                    alt="image"
                    width={300}
                    height={150}
                    className="w-full"
                  />
                </div>
                <p className="text-white">
                  How to start marketing on a low budget
                </p>
              </a>
              <a
                href="/latest-news"
                className="mb-8 flex items-center text-gray-1 hover:text-white"
              >
                <div className="mr-5 w-full max-w-[70px] overflow-hidden rounded">
                  <Image
                    src="https://cdn.tailgrids.com/2.0/image/application/images/footers/footer-04/blog-02.jpg"
                    alt="image"
                    width={300}
                    height={150}
                    className="w-full"
                  />
                </div>
                <p className="text-white">
                  Social media marketing for small businesses
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-[#8890A46E] py-8 lg:mt-[60px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2">
              <div className="my-1">
                <div className="-mx-3 flex flex-wrap items-center justify-center md:justify-start">
                  <BottomNavLink link="/#" label="Privacy policy" />
                  <BottomNavLink link="/#" label="Legal notice" />
                  <BottomNavLink link="/#" label="Terms of service" />
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex justify-center md:justify-end">
                <p className="text-white text-gray-1">
                  &copy; {new Date().getFullYear()} Blooming Brands LLC, Boston
                  MA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface LinkGroupProps {
  children: ReactNode;
  header: string;
}

const LinkGroup: React.FC<LinkGroupProps> = ({ children, header }) => {
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-3/12 xl:w-2/12">
      <div className="mb-10 w-full">
        <h4 className="mb-9 text-lg font-semibold text-white uppercase">
          {header}{" "}
        </h4>
        <ul className="space-y-3">{children}</ul>
      </div>
    </div>
  );
};

interface NavLinkProps {
  label: string;
  link: string;
}

const NavLink: React.FC<NavLinkProps> = ({ label, link }) => {
  return (
    <li>
      <a
        href={link}
        className="inline-block text-white leading-loose text-gray-1 underline-offset-2 hover:text-white hover:underline"
      >
        {label}
      </a>
    </li>
  );
};

const BottomNavLink: React.FC<NavLinkProps> = ({ label, link }) => {
  return (
    <a
      href={link}
      className="px-3 text-white text-gray-1 underline-offset-2 hover:text-white hover:underline"
    >
      {label}
    </a>
  );
};
