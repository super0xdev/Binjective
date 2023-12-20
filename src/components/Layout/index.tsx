import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
// import NewNavbar from "~/components/Navbar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import NoticeBar from "./NoticeBar";
import { SHOW_CAMPAIGN } from "~/lib/utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationModal from "../Modals/LocationModal";
import { BLOCK_REGIONS } from "~/lib/utils/constants";
import Preloader from "./Preloader";

const toastOptions = {
  style: {
    background: "#2E79DC",
    color: "white",
  },
  success: {
    className: "",
    iconTheme: {
      primary: "#10B981",
      secondary: "white",
    },
  },
  error: {
    className: "",
    iconTheme: {
      primary: "#f87171",
      secondary: "white",
    },
  },
  loading: { className: "border border-yello-400" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    setScrollHeight(window.innerHeight);
  }, []);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader />
      <div className="bg-white font-sans">
        <ToastContainer theme="light" draggable position="top-center" />
        <Toaster position="top-center" toastOptions={toastOptions} />
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center">
              Loading...
            </div>
          }
        >
          {showLoader ? null : <Navbar />}
          <div
            className="flex-1 bg-white"
            style={{
              height: scrollHeight !== 0 ? `${scrollHeight}px` : "900px",
              overflowY: "scroll",
            }}
          >
            {children}
            <Footer />
          </div>
        </Suspense>
      </div>
    </>
  );
}
