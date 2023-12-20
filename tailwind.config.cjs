/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "banner-pattern": "url(/bg.png)",
        "wave-pattern": "url(/bg2.png)",
        "nft-blur-pattern": "url(/bkg_blur.png)",
      },
      colors: {
        "primary-default": "#2e79dc",
        "primary-dark": "#235ead",
        "primary-dark2": "#1d4882",
        "primary-dark3": "#1D7FFD",
        "primary-light": "#579efc",
        "primary-light2": "#9cc7ff",
        "primary-hover": "#4e96f6",
        "primary-pressed": "#135dc0",
        "primary-disabled": "#cacaca",
        "secondary-default": "#f7f7f7",
        alert: "#d94747",
        complementary: "#18e783",
        "gray-dark1": "#353535",
        gray: "#6c6c6c",
        "gray-light": "#9d9d9d",
        "gray-light2": "#d3d3d3",
        "gray-light3": "#f0f0f0",
        "gray-market": "#f6f8fc",
      },
      spacing: {
        2: "0.5rem",
        3.25: "0.8125rem",
        3.5: "0.875rem",
        5: "1.25rem",
        5.5: "1.375rem",
        10.5: "2.625rem",
        11: "2.75rem",
        11.5: "2.875rem",
        12.5: "3.125rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        21: "5.25rem",
        21.5: "5.375rem",
        22: "5.5rem",
        23: "5.75rem",
        24: "6rem",
        25: "6.25rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.5rem",
        31.25: "7.8125rem",
        32.5: "8.125rem",
        33.5: "8.375rem",
        35: "8.75rem",
        38: "9.5rem",
        41: "10.25rem",
        48: "12rem",
        50: "12.5rem",
        52: "13rem",
        53.5: "13.375rem",
        55: "13.75rem",
        60: "15rem",
        82.5: "20.625rem",
        85: "21.25rem",
        110: "27.5rem",
        113: "28.25rem",
        120: "30rem",
        130: "32.5rem",
        133: "33.25rem",
        165: "41.25rem",
        168: "42rem",
        175: "43.75rem",
        180: "45rem",
        198: "49.5rem",
        200: "50rem",
        240: "60rem",
        270: "67.5rem",
        400: "100rem",
      },
      minWidth: {
        6: "1.5rem",
      },
      maxWidth: {
        200: "50rem",
        360: "90rem",
      },
      fontSize: {
        "2xl-28": "1.75rem",
        "3xl-32": "2rem",
        "6.5xl": [
          "4rem",
          {
            lineHeight: "1",
          },
        ],
      },
      borderRadius: {
        2.5: "0.625rem",
        15: "3.75rem",
      },
      borderWidth: {
        3: "3px",
        6: "6px",
      },
    },
  },
  plugins: [],
};

module.exports = config;