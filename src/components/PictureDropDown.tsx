"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/app/lib/auth-client";
import type { PictureDropdownProps } from "@/types";


  

  export function PictureDropDown({ session }: PictureDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const { name, email, image } = session.data?.user ?? {};
  
    const toggle = () => setIsOpen(!isOpen);
  
    useEffect(() => {
      function handleOutsideClick(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
  
      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isOpen]);
  
    return (
      <>
        <button
          ref={buttonRef}
          onClick={toggle}
          className="relative focus:outline-none"
        >
          {image ? ( // Safely handle `null` for `image`
            <Image
              src={image}
              alt={name ?? "User"}
              width={40}
              height={40}
              className="rounded-full  border-2 border-main-orange"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {/* Default avatar if no image */}
              <span className="text-sm font-medium text-gray-700">{name?.charAt(0)}</span>
            </div>
          )}
        </button>
  
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-5 top-16 z-50 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
          >
            <div className="border-b border-gray-300 p-4 text-center">
              <h1 className="text-lg font-semibold text-gray-800">
                {name ?? "User"}
              </h1>
              <p className="text-sm text-gray-500">
                {email ?? "No email available"}
              </p>
            </div>
            <div className="py-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              {/* <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link> */}
              <button
                onClick={async () => {
                  try {
                    await signOut();
                    window.location.href = "/";
                  } catch (error) {
                    console.error("Failed to sign out:", error);
                  }
                }}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </>
    );
  }